import UserRepository from "../../src/application/repository/UserRepository";
import Login from "../../src/application/usecase/Login";
import Signup from "../../src/application/usecase/Signup";
import User from "../../src/domain/entity/User";

test("Deve criar uma conta para o usuário", async function () {
	const users: any = {};
	const userRepository: UserRepository = {
		async save (user: User): Promise<void> {
			users[user.email.getValue()] = user;
		},
		async get (email: string): Promise<User> {
			return users[email];
		}
	}
	const signup = new Signup(userRepository);
	const input = {
		email: "joao@gmail.com",
		password: "abc123",
		date: new Date("2023-03-01T10:00:00")
	}
	await signup.execute(input);

	const login = new Login(userRepository);
	const output = await login.execute(input);
	expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
});
