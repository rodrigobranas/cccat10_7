export default interface FreightGateway {
	calculateFreight (input: Input): Promise<Output>;
}

export type Input = {
	items: {
		width: number,
		height: number,
		length: number,
		weight: number,
		quantity: number
	}[]
}

type Output = {
	freight: number
}
