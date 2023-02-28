import Order from "../entities/Order";
import Product from "../entities/Product";

export default interface CheckoutGateway {
	getProducts (): Promise<Product[]>;
	checkout (order: Order): Promise<any>;
}
