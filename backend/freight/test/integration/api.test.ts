import axios from "axios";

test("Deve testar o cálculo do frete", async function () {
	const input = {
		items: [
			{ width: 100, height: 30, length: 10, weight: 3, quantity: 2 }
		],
		from: "22060030",
		to: "88015600"
	};
	const response = await axios.post("http://localhost:3002/calculateFreight", input);
	const output = response.data;
	expect(output.freight).toBe(60);
});
