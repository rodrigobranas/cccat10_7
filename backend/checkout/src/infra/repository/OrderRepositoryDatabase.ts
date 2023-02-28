import OrderRepository from "../../application/repository/OrderRepository";
import Order from "../../domain/entity/Order";
import Item from "../../domain/entity/Item";
import Connection from "../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}

	async save(order: Order): Promise<void> {
		await this.connection.query("insert into cccat10.order (id_order, cpf, code, total, freight) values ($1, $2, $3, $4, $5)", [order.idOrder, order.cpf, order.code, order.getTotal(), order.freight]);
		for (const item of order.items) {
			await this.connection.query("insert into cccat10.item (id_order, id_product, price, quantity) values ($1, $2, $3, $4)", [order.idOrder, item.idProduct, item.price, item.quantity]);
		}
	}

	async getById(id: string): Promise<Order> {
		const [orderData] = await this.connection.query("select * from cccat10.order where id_order = $1", [id]);
		const order = new Order(orderData.id_order, orderData.cpf, undefined, 1, new Date());
		const itemsData = await this.connection.query("select * from cccat10.item where id_order = $1", [id]);
		for (const itemData of itemsData) {
			order.items.push(new Item(itemData.id_product, parseFloat(itemData.price), itemData.quantity, "BRL"));
		}
		return order;
	}

	async count(): Promise<number> {
		const [options] = await this.connection.query("select count(*) from cccat10.order", []);
		return parseInt(options.count);
	}

}