import StockCalculator from "../../domain/entity/StockCalculator";
import StockEntryRepository from "../repository/StockEntryRepository";

export default class CalculateStock {

	constructor (readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (input: { idProduct: number }): Promise<Output> {
		const stockEntries = await this.stockEntryRepository.list(input.idProduct);
		const total = StockCalculator.calculate(stockEntries);
		return {
			total
		};
	}
}

type Output = {
	total: number
}