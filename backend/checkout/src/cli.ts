import Checkout from "./application/usecase/Checkout";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import PgPromise from "./infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";

const input: Input = { cpf: "", items: [] };
process.stdin.on("data", async function (chunk) {
	const command = chunk.toString().replace(/\n/g, "");
	if (command.startsWith("set-cpf")) {
		input.cpf = command.replace("set-cpf ", "");
	}
	if (command.startsWith("add-item")) {
		const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
		input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
	}
	if (command.startsWith("checkout")) {
		try {
			const connection = new PgPromise();
			const httpClient = new AxiosAdapter();
			const currencyGateway = new CurrencyGatewayHttp(httpClient)
			const productRepository = new ProductRepositoryDatabase(connection);
			const couponRepository = new CouponRepositoryDatabase(connection);
			const orderRepository = new OrderRepositoryDatabase(connection);
			const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
			const output = await checkout.execute(input);
			console.log(output);
		} catch (e: any) {
			console.log(e.message);
		}
	}
});

type Input = {
	cpf: string,
	items: { idProduct: number, quantity: number }[],
	coupon?: string,
	from?: string,
	to?: string
}
