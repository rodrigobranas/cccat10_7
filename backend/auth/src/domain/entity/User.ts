import Email from "./Email";
import Password from "./Password";

// entity
export default class User {

	private constructor (readonly email: Email, readonly password: Password) {
	}

	static async create (email: string, password: string) {
		return new User(new Email(email), await Password.create(password));
	}

	static async buildExistingUser (email: string, hash: string, salt: string) {
		return new User(new Email(email), new Password(hash, salt));
	}

	async validatePassword (password: string) {
		return this.password.validate(password);
	}
}