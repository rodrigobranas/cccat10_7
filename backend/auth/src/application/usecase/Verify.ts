import TokenGenerator from "../../domain/entity/TokenGenerator";
import User from "../../domain/entity/User";
import UserRepository from "../repository/UserRepository";

// use case
export default class Verify {

	constructor () {
	}

	async execute (token: string): Promise<any> {
		const tokenGenerator = new TokenGenerator("key");
		return tokenGenerator.verify(token);
	}
}
