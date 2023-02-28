import FreightCalculator from "../../domain/entity/FreightCalculator";
import ProductRepository from "../repository/ProductRepository";
import ProductRepositoryDatabase from "../../infra/repository/ProductRepositoryDatabase";

export default class SimulateFreight {

	constructor (
		readonly productRepository: ProductRepository
	) {
	}

	async execute (input: Input): Promise<Output> {
		const output: Output = {
			freight: 0
		};
		if (input.items) {
			for (const item of input.items) {
				const product = await this.productRepository.getProduct(item.idProduct);
				const itemFreight = FreightCalculator.calculate(product, item.quantity);
				output.freight += itemFreight;
			}
		}
		return output;
	}
}

type Input = {
	items: { idProduct: number, quantity: number }[],
}

type Output = {
	freight: number
}