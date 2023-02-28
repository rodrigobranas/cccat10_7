import Order from "../src/entities/Order";
import Product from "../src/entities/Product";

test("Deve criar um pedido", function () {
	const cpf = "407.302.170-27";
	const order = new Order(cpf);
	order.addItem(new Product(1, "A", 1000));
	order.addItem(new Product(2, "B", 5000));
	order.addItem(new Product(3, "C", 30));
	order.addItem(new Product(3, "C", 30));
	order.addItem(new Product(3, "C", 30));
	expect(order.items).toHaveLength(3);
	expect(order.total).toBe(6090);
});
