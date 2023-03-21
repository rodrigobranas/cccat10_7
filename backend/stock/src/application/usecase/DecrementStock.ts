import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepository from "../repository/StockEntryRepository";

export default class DecrementStock {

	constructor (readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (input: Input) {
		console.log("decrementStock");
		for (const item of input.items) {
			await this.stockEntryRepository.save(new StockEntry(item.idProduct, "out", item.quantity));
		}
	}
}

type Input = {
	items: { idProduct: number, quantity: number }[]
}