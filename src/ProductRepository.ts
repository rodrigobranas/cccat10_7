export default interface ProductRepository {
	getProduct (idProduct: number): Promise<any>;
}
