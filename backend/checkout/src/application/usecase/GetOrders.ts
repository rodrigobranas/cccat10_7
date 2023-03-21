import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";
import CatalogGateway from "../gateway/CatalogGateway";
import Connection from "../../infra/database/Connection";

export default class GetOrders {

	constructor (
		readonly connection: Connection
	) {
	}

	async execute (): Promise<Output> {
		const ordersData = await this.connection.query("select * from cccat10.order join cccat10.item using (id_order) join cccat10.product using (id_product)", []);
		return ordersData;
	}
}

type Output = {
	code: string,
	total: number,
	freight: number
}
