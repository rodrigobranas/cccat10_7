import StockGateway, { Input } from "../../application/gateway/StockGateway";
import HttpClient from "../http/HttpClient";

export default class StockGatewayHttp implements StockGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async decrementStock(input: Input) {
		const response = await this.httpClient.post("http://localhost:3005/decrementStock", input);
		return response;
	}
}
