import axios from "axios";
import CurrencyGateway from "../../application/gateway/CurrencyGateway";
import HttpClient from "../http/HttpClient";

export default class CurrencyGatewayHttp implements CurrencyGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async getCurrencies() {
		const response = await this.httpClient.get("http://localhost:3001/currencies");
		return response;
	}
}
