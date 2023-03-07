import FreightCalculator from "../../domain/entity/FreightCalculator";

export default class CalculateFreight {

	constructor () {
	}

	async execute (input: Input): Promise<Output> {
		const output: Output = {
			freight: 0
		};
		if (input.items) {
			for (const item of input.items) {
				const itemFreight = FreightCalculator.calculate(item.width, item.height, item.length, item.weight, item.quantity);
				output.freight += itemFreight;
			}
		}
		return output;
	}
}

type Input = {
	items: { width: number, height: number, length: number, weight: number, quantity: number }[]
}

type Output = {
	freight: number
}