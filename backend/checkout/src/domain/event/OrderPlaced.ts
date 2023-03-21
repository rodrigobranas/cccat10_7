export default class OrderPlaced {
	items: { idProduct: number, quantity: number }[]

	constructor () {
		this.items = [];
	}
}
