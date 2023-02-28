import Product from "../../src/domain/entity/Product";

test("Não deve criar um produto com dimensões inválidas", function () {
	expect(() => new Product(1, "A", 1000, -10, -10, -10, -10, "BRL")).toThrow(new Error("Invalid dimension"));
});
