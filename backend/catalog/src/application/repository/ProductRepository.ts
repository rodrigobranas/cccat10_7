import Product from "../../domain/entity/Product";

export default interface ProductRepository {
	getProduct (idProduct: number): Promise<Product>;
	getProducts (): Promise<Product[]>;
}
