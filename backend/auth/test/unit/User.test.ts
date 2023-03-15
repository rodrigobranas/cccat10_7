import User from "../../src/domain/entity/User";

test("Deve criar um novo usuário", async function () {
	const user = await User.create("joao@gmail.com", "abc123");
	const isValidPassword = await user.validatePassword("abc123");
	expect(isValidPassword).toBeTruthy();
});

test("Deve criar um usuário a partir do banco de dados", async function () {
	const user = await User.buildExistingUser("joao@gmail.com", "bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2", "salt");
	const isValidPassword = await user.validatePassword("abc123");
	expect(isValidPassword).toBeTruthy();
});
