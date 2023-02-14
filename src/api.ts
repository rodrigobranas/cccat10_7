import express, { Request, Response } from "express";
import Checkout from "./application/usecase/Checkout";
const app = express();
app.use(express.json());

app.post("/checkout", async function (req: Request, res: Response) {
	try {
		const checkout = new Checkout();
		const output = await checkout.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).json({
			message: e.message
		});
	}

});

app.listen(3000);