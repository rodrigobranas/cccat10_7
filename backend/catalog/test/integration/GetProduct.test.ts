import GetProduct from "../../src/application/usecase/GetProduct";
import PgPromise from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

test("Deve listar os produtos", async function () {
	const connection = new PgPromise();
	const productRepository = new ProductRepositoryDatabase(connection);
	const getProduct = new GetProduct(productRepository);
	const output = await getProduct.execute(1);
	expect(output.idProduct).toBe(1);
	expect(output.description).toBe("A");
	expect(output.price).toBe(1000);
	expect(output.volume).toBe(0.03);
	expect(output.density).toBe(0.01);
	await connection.close();
});
