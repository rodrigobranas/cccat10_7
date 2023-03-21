export default interface StockGateway {
	decrementStock (input: Input): Promise<void>;
}

export type Input = {
	items: { idProduct: number, quantity: number }[]
}