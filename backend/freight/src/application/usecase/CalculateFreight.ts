import DistanceCalculator from "../../domain/entity/DistanceCalculator";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import ZipcodeRepository from "../repository/ZipcodeRepository";

export default class CalculateFreight {

	constructor (readonly zipcodeRepository: ZipcodeRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const output: Output = {
			freight: 0
		};
		let distance = 1000;
		if (input.from && input.to) {
			const from = await this.zipcodeRepository.get(input.from);
			const to = await this.zipcodeRepository.get(input.to);
			if (from && to) {
				distance = DistanceCalculator.calculate(from.coord, to.coord);
			}
		}
		if (input.items) {
			for (const item of input.items) {
				const itemFreight = FreightCalculator.calculate(distance, item.width, item.height, item.length, item.weight, item.quantity);
				output.freight += itemFreight;
			}
		}
		return output;
	}
}

type Input = {
	items: { width: number, height: number, length: number, weight: number, quantity: number }[],
	from?: string,
	to?: string
}

type Output = {
	freight: number
}