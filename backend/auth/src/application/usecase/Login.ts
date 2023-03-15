import TokenGenerator from "../../domain/entity/TokenGenerator";
import User from "../../domain/entity/User";
import UserRepository from "../repository/UserRepository";

// use case
export default class Login {

	constructor (readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const user = await this.userRepository.get(input.email);
		if (!user) throw new Error("User not found");
		const isPasswordValid = await user.validatePassword(input.password);
		if (!isPasswordValid) throw new Error("Invalid password");
		const tokenGenerator = new TokenGenerator("key");
		const token = tokenGenerator.generate(user, 1000000, input.date);
		return {
			token
		}
	}
}

type Input = {
	email: string,
	password: string,
	date: Date
}

type Output = {
	token: string
}