import SimulateFreight from "../src/application/usecase/SimulateFreight";

let simulateFreight: SimulateFreight;

beforeEach(function () {
	simulateFreight = new SimulateFreight();
});

test("Deve calcular o frete para um pedido com 3 itens", async function () {
	const input = {
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		from: "22060030",
		to: "88015600"
	};
	const output = await simulateFreight.execute(input);
	expect(output.freight).toBe(280);
});
