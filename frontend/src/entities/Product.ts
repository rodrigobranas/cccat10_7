import formatMoney from "../formatter/MoneyFormatter";

export default class Product {

	constructor (readonly idProduct: number, readonly description: string, readonly price: number) {
	}

	getFormattedPrice () {
		return formatMoney(this.price);
	}
}
