import ProductRepository from "../repository/ProductRepository";

export default class GetProduct {

	constructor (
		readonly productRepository: ProductRepository
	) {
	}

	async execute (idProduct: number): Promise<Output> {
		const product  = await this.productRepository.getProduct(idProduct);
		const output = Object.assign(product, {
			volume: product.getVolume(),
			density: product.getDensity()
		});
		return output;
	}
}

type Output = {
	idProduct: number,
	description: string,
	price: number,
	width: number,
	height: number,
	length: number,
	weight: number,
	currency: string,
	volume: number,
	density: number
}
