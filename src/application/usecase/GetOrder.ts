import OrderRepository from "../../OrderRepository";
import OrderRepositoryDatabase from "../../OrderRepositoryDatabase";

export default class GetOrder {

	constructor (
		readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()
	) {
	}

	async execute (id: string): Promise<Output> {
		console.log(id)
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
