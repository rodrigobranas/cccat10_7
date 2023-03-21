import CouponRepository from "../repository/CouponRepository";
import CurrencyGateway from "../gateway/CurrencyGateway";
import CurrencyTable from "../../domain/entity/CurrencyTable";
import Order from "../../domain/entity/Order";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";
import FreightGateway, { Input as FreightInput } from "../gateway/FreightGateway";
import FreightGatewayHttp from "../../infra/gateway/FreightGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import CatalogGateway from "../gateway/CatalogGateway";
import CatalogGatewayHttp from "../../infra/gateway/CatalogGatewayHttp";
import Usecase from "./Usecase";
import CurrencyGatewayHttp from "../../infra/gateway/CurrencyGatewayHttp";
import StockGateway from "../gateway/StockGateway";
import StockGatewayHttp from "../../infra/gateway/StockGatewayHttp";
import Queue from "../../infra/queue/Queue";

export default class Checkout implements Usecase {

	constructor (
		readonly currencyGateway: CurrencyGateway,
		readonly productRepository: ProductRepository,
		readonly couponRepository: CouponRepository,
		readonly orderRepository: OrderRepository,
		readonly freightGateway: FreightGateway = new FreightGatewayHttp(new AxiosAdapter()),
		readonly catalogGateway: CatalogGateway = new CatalogGatewayHttp(new AxiosAdapter()),
		readonly stockGateway: StockGateway = new StockGatewayHttp(new AxiosAdapter()),
		readonly queue?: Queue
	) {
	}

	async execute (input: Input): Promise<Output> {
		const currencies = await this.currencyGateway.getCurrencies();
		const currencyTable = new CurrencyTable();
		currencyTable.addCurrency("USD", currencies.usd);
		const sequence = await this.orderRepository.count();
		const order = new Order(input.uuid, input.cpf, currencyTable, sequence, new Date());
		const freightInput: FreightInput = { items: [], from: input.from, to: input.to };
		if (input.items) {
			for (const item of input.items) {
				const product = await this.catalogGateway.getProduct(item.idProduct);
				order.addItem(product, item.quantity);
				freightInput.items.push({ width: product.width, height: product.height, length: product.length, weight: product.weight, quantity: item.quantity });
			}
		}
		const freightOutput = await this.freightGateway.calculateFreight(freightInput);
		const freight = freightOutput.freight;
		if (input.from && input.to) {
			order.freight = freight;
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.getCoupon(input.coupon);
			order.addCoupon(coupon);
		}
		let total = order.getTotal();
		await this.orderRepository.save(order);
		if (this.queue) {
			await this.queue.publish("orderPlaced", input);
		}
		return {
			total,
			freight
		};
	}
}

type Input = {
	uuid?: string,
	cpf: string,
	items: { idProduct: number, quantity: number, price?: number }[],
	coupon?: string,
	from?: string,
	to?: string
}

type Output = {
	total: number,
	freight: number
}
