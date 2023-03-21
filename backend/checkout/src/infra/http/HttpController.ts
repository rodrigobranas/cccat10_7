import Checkout from "../../application/usecase/Checkout";
import GetProducts from "../../application/usecase/GetProducts";
import Usecase from "../../application/usecase/Usecase";
import Queue from "../queue/Queue";
import HttpServer from "./HttpServer";

export default class HttpController {

	constructor (
		readonly httpServer: HttpServer, 
		readonly checkout: Usecase,
		readonly getProducts: Usecase,
		readonly queue: Queue
	) {
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			const output = await checkout.execute(body);
			return output;
		});

		httpServer.on("post", "/checkoutAsync", async function (params: any, body: any) {
			queue.publish("placeOrder", body);
		});

		httpServer.on("get", "/products", async function (params: any, body: any) {
			const output = await getProducts.execute();
			return output;
		});
	}
}