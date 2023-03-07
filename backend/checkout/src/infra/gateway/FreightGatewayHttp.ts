import FreightGateway, { Input } from "../../application/gateway/FreightGateway";
import HttpClient from "../http/HttpClient";

export default class FreightGatewayHttp implements FreightGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async calculateFreight(input: Input) {
		const response = await this.httpClient.post("http://localhost:3002/calculateFreight", input);
		return response;
	}
}
