import ValidateCoupon from "../src/application/usecase/ValidateCoupon";

let validateCoupon: ValidateCoupon;

beforeEach(function () {
	validateCoupon = new ValidateCoupon();
});

test("Deve validar um cupom de desconto válido", async function () {
	const input = "VALE20"
	const output = await validateCoupon.execute(input);
	expect(output).toBeTruthy();
});

test("Deve validar um cupom de desconto expirado", async function () {
	const input = "VALE10"
	const output = await validateCoupon.execute(input);
	expect(output).toBeFalsy();
});
