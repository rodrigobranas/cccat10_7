import GetProduct from "../../application/usecase/GetProduct";
import GetProducts from "../../application/usecase/GetProducts";
import HttpServer from "./HttpServer";

export default class HttpController {

	constructor (
		readonly httpServer: HttpServer, 
		readonly getProducts: GetProducts,
		readonly getProduct: GetProduct
	) {

		httpServer.on("get", "/products", async function (params: any, body: any) {
			const output = await getProducts.execute();
			return output;
		});

		httpServer.on("get", "/products/:idProduct", async function (params: any, body: any) {
			const output = await getProduct.execute(params.idProduct);
			return output;
		});
	}
}