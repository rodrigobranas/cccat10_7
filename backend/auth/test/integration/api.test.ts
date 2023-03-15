import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve validar o fluxo de autenticação", async function () {
	const input = {
		email: "joao@gmail.com",
		password: "abc123",
		date: new Date("2023-03-01T10:00:00")
	};
	await axios.post("http://localhost:3004/signup", input);
	const response = await axios.post("http://localhost:3004/login", input);
	const output = response.data;
	expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
	const response2 = await axios.post("http://localhost:3004/verify", { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY" });
	const output2 = response2.data;
	expect(output2.email).toBe("joao@gmail.com");
});
