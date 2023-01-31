import { validate } from "../src/validator";

test.each([
	"407.302.170-27",
	"684.053.160-00",
	"746.971.314-01"
])("Deve testar um cpf válido", function (cpf) {
	const isValid = validate(cpf);
	expect(isValid).toBeTruthy();
});

test.each([
	"406.302.170-27",
	"406302170",
	"406302170123456789",
	"406302170123456789"
])("Deve testar um cpf inválido", function (cpf) {
	const isValid = validate(cpf);
	expect(isValid).toBeFalsy();
});

test.each([
	"111.111.111-11",
	"222.222.222-22"
])("Deve testar um cpf inválido com todos os dígitos iguais", function (cpf) {
	const isValid = validate(cpf);
	expect(isValid).toBeFalsy();
});