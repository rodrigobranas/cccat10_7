import CalculateStock from "../../application/usecase/CalculateStock";
import DecrementStock from "../../application/usecase/DecrementStock";
import HttpServer from "./HttpServer";

export default class HttpController {

	constructor (
		readonly httpServer: HttpServer,
		readonly decrementStock: DecrementStock,
		readonly calculateStock: CalculateStock
	) {
		httpServer.on("post", "/decrementStock", async function (params: any, body: any) {
			const output = await decrementStock.execute(body);
			return output;
		});

		httpServer.on("post", "/calculateStock", async function (params: any, body: any) {
			const output = await calculateStock.execute(body);
			return output;
		});
	}
}
