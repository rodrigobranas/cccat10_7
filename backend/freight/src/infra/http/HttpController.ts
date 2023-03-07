import CalculateFreight from "../../application/usecase/CalculateFreight";
import HttpServer from "./HttpServer";

export default class HttpController {

	constructor (
		readonly httpServer: HttpServer,
		readonly calculateFreight: CalculateFreight
	) {
		httpServer.on("post", "/calculateFreight", async function (params: any, body: any) {
			const output = await calculateFreight.execute(body);
			return output;
		});
	}
}