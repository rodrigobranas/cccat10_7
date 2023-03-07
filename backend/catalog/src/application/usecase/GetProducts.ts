import ProductRepository from "../repository/ProductRepository";

export default class GetProducts {

	constructor (
		readonly productRepository: ProductRepository
	) {
	}

	async execute (): Promise<Output> {
		const output: Output = [];
		const products  = await this.productRepository.getProducts();
		for (const product of products) {
			output.push({ 
				idProduct: product.idProduct, 
				description: product.description, 
				price: product.price 
			});
		}
		return output;
	}
}

type Output = {
	idProduct: number,
	description: string,
	price: number
}[]