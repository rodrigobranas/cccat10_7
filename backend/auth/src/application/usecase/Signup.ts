import User from "../../domain/entity/User";
import UserRepository from "../repository/UserRepository";

// use case
export default class Signup {

	constructor (readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<void> {
		const user = await User.create(input.email, input.password);
		await this.userRepository.save(user);
	}
}

type Input = {
	email: string,
	password: string
}
