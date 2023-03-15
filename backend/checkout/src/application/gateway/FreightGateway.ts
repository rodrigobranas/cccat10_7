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
	}[],
	from?: string,
	to?: string
}

type Output = {
	freight: number
}
