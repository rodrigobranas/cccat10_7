import express, { Request, Response } from "express";
import { validate } from "./validator";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

app.post("/checkout", async function (req: Request, res: Response) {
	const output: Output = {
		total: 0
	};
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	if (req.body.items) {
		for (const item of req.body.items) {
			const [productData] = await connection.query("select * from cccat10.product where id_product = $1", item.idProduct);
			output.total += parseFloat(productData.price) * item.quantity;
		}
	}
	if (req.body.coupon) {
		const [couponData] = await connection.query("select * from cccat10.coupon where code = $1", [req.body.coupon]);
		const percentage = parseFloat(couponData.percentage);
		output.total -= (output.total * percentage)/100;
	}
	const isValid = validate(req.body.cpf);
	if (!isValid) output.message = "Invalid cpf";
	await connection.$pool.end();
	res.json(output);
});

type Output = {
	total: number,
	message?: string
}

app.listen(3000);