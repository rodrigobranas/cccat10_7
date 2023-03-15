import Usecase from "../usecase/Usecase";

export default class LogDecorator implements Usecase {

	constructor (
		readonly usecase: Usecase
	) {
	}

	async execute(input: any): Promise<any> {
		console.log(input);
		return this.usecase.execute(input);
	}
}
