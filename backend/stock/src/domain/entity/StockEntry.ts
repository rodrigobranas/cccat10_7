export default class StockEntry {
	constructor (readonly idProduct: number, readonly operation: "in" | "out", readonly quantity: number) {
		if (quantity < 1) throw new Error("Invalid quantity");
	}
}
