import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";

export default class GetOrder {

	constructor (
		readonly orderRepository: OrderRepository
	) {
	}

	async execute (id: string): Promise<Output> {
		const order = await this.orderRepository.getById(id);
		const output: Output = {
			code: order.getCode(),
			total: order.getTotal(),
			freight: order.freight
		};
		return output;
	}
}

type Output = {
	code: string,
	total: number,
	freight: number
}
