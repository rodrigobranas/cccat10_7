import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import Connection from "../../src/infra/database/Connection";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "../../src/infra/gateway/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "../../src/infra/repository/OrderRepositoryDatabase";
import PgPromise from "../../src/infra/database/PgPromiseAdapter";
import ProductRepository from "../../src/application/repository/ProductRepository";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

let simulateFreight: SimulateFreight;
let connection: Connection;
let productRepository: ProductRepository;

beforeEach(function () {
	connection = new PgPromise();
	productRepository = new ProductRepositoryDatabase(connection);
	simulateFreight = new SimulateFreight(productRepository);
});

afterEach(async function () {
	await connection.close();
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
