import FreightCalculator from "../../domain/entity/FreightCalculator";
import ProductRepository from "../../ProductRepository";
import ProductRepositoryDatabase from "../../ProductRepositoryDatabase";

export default class SimulateFreight {

	constructor (
		readonly productRepository: ProductRepository = new ProductRepositoryDatabase()
	) {
	}

	async execute (input: Input): Promise<Output> {
		const output: Output = {
			freight: 0
		};
		if (input.items) {
			for (const item of input.items) {
				const product = await this.productRepository.getProduct(item.idProduct);
				const itemFreight = FreightCalculator.calculate(product);
				output.freight += Math.max(itemFreight, 10) * item.quantity;
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