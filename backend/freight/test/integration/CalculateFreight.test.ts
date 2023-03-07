import CalculateFreight from "../../src/application/usecase/CalculateFreight";

let calculateFreight: CalculateFreight;

beforeEach(function () {
	calculateFreight = new CalculateFreight();
});

afterEach(async function () {
});

test("Deve calcular o frete para um pedido com 3 itens", async function () {
	const input = {
		items: [
			{ width: 100, height: 30, length: 10, weight: 3, quantity: 2 }
		],
		from: "22060030",
		to: "88015600"
	};
	const output = await calculateFreight.execute(input);
	expect(output.freight).toBe(60);
});
