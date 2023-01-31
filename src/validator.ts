function calculateDigit (cpf: string, factor: number) {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const rest = total%11;
	return (rest < 2) ? 0 : 11 - rest;
}

function clean (cpf: string) {
	return cpf.replace(/\D/g, "");
}

function isValidLength (cpf: string) {
	return cpf.length !== 11;
}

function allDigitsTheSame (cpf: string) {
	return cpf.split("").every(c => c === cpf[0]);
}

function extractCheckDigit (cpf: string) {
	return cpf.substring(cpf.length-2, cpf.length);
}

export function validate (cpf: string) {
	if (!cpf) return false;
	cpf = clean(cpf);
	if (isValidLength(cpf)) return false;
	if (allDigitsTheSame(cpf)) return false;
	const digit1 = calculateDigit(cpf, 10);
	const digit2 = calculateDigit(cpf, 11);
	const actualDigit = extractCheckDigit(cpf);
	const calculatedDigit = `${digit1}${digit2}`;
	return actualDigit == calculatedDigit;
}
