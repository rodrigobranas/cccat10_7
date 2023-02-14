import FreightCalculator from "../src/domain/entity/FreightCalculator";
import Product from "../src/domain/entity/Product";

test("Deve calcular o frete do produto", function () {
	const product = new Product(6, "A", 1000, 100, 30, 10, 3, "USD");
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(30);
});
