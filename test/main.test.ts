import axios from "axios";

test("Não deve aceitar um pedido com cpf inválido", async function () {
	const input = {
		cpf: "406.302.170-27"
	}
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.message).toBe("Invalid cpf");
});

test("Deve criar um pedido vazio", async function () {
	const input = {
		cpf: "407.302.170-27"
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 produtos", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(4872);
});
