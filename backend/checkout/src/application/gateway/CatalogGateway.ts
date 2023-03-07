import Product from "../../domain/entity/Product";

export default interface CatalogGateway {
	getProducts(): Promise<Product[]>;
	getProduct(idProduct: number): Promise<Product>;
}