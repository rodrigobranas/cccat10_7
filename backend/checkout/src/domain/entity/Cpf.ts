export default class Cpf {
	readonly value: string;

	constructor (cpf: string) {
		if (!this.validate(cpf)) throw new Error("Invalid cpf");
		this.value = cpf;
	}

	calculateDigit (cpf: string, factor: number) {
		let total = 0;
		for (const digit of cpf) {
			if (factor > 1) total += parseInt(digit) * factor--;
		}
		const rest = total%11;
		return (rest < 2) ? 0 : 11 - rest;
	}
	
	clean (cpf: string) {
		return cpf.replace(/\D/g, "");
	}
	
	isValidLength (cpf: string) {
		return cpf.length !== 11;
	}
	
	allDigitsTheSame (cpf: string) {
		return cpf.split("").every(c => c === cpf[0]);
	}
	
	extractCheckDigit (cpf: string) {
		return cpf.substring(cpf.length-2, cpf.length);
	}
	
	validate (cpf: string) {
		if (!cpf) return false;
		cpf = this.clean(cpf);
		if (this.isValidLength(cpf)) return false;
		if (this.allDigitsTheSame(cpf)) return false;
		const digit1 = this.calculateDigit(cpf, 10);
		const digit2 = this.calculateDigit(cpf, 11);
		const actualDigit = this.extractCheckDigit(cpf);
		const calculatedDigit = `${digit1}${digit2}`;
		return actualDigit == calculatedDigit;
	}
	
}
