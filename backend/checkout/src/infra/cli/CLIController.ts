import Checkout from "../../application/usecase/Checkout";
import CLIHandler from "./CLIHandler";

export default class CLIController {

	constructor (readonly handler: CLIHandler, readonly checkout: Checkout) {
		const input: Input = { cpf: "", items: [] };
		handler.on("set-cpf", function (params: any) {
			input.cpf = params;
		});
		handler.on("add-item", function (params: any) {
			const [idProduct, quantity] = params.split(" ");
			input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
		});
		handler.on("checkout", async function (params: any) {
			try {
				const output = await checkout.execute(input);
				handler.write(JSON.stringify(output));
			} catch (e: any) {
				handler.write(e.message);
			}
		});
	}
}

type Input = {
	cpf: string,
	items: { idProduct: number, quantity: number }[],
	coupon?: string,
	from?: string,
	to?: string
}