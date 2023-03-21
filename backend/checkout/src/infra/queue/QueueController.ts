import Checkout from "../../application/usecase/Checkout";
import Queue from "./Queue";

export default class QueueController {

	constructor (readonly queue: Queue, readonly checkout: Checkout) {
		queue.on("placeOrder", async function (input: any) {
			await checkout.execute(input);
		});
	}
}
