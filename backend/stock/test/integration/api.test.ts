import axios from "axios";

test("Deve decrementar o estoque pela api", async function () {
	const input = {
		items: [
			{ idProduct: 1, quantity: 10 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	}
	await axios.post("http://localhost:3005/decrementStock", input);
	const response = await axios.post("http://localhost:3005/calculateStock", { idProduct: 1 });
	const output = response.data;
	expect(output.total).toBe(10);
});
