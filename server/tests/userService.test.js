const UserService = require("../src/services/UserService");
const User = require("../src/models/User");

describe("UserService CRUD", () => {
	let user;

	beforeEach(async () => {
		user = await User.create({
			username: "lola",
			email: "lola@mail.com",
			password: "secret",
		});
	});

	it("obtiene usuario por username", async () => {
		const found = await UserService.getByUsername("lola");
		expect(found.email).toBe("lola@mail.com");
	});

	it("lanza error si username no existe", async () => {
		await expect(UserService.getByUsername("ghost")).rejects.toThrow(
			"Usuario no encontrado"
		);
	});

	it("actualiza username / email", async () => {
		const updated = await UserService.updateUser(user._id, {
			username: "loli",
			email: "loli@mail.com",
		});
		expect(updated.username).toBe("loli");
	});

	it("impide duplicar username o email", async () => {
		await User.create({
			username: "otro",
			email: "otro@mail.com",
			password: "x",
		});

		await expect(
			UserService.updateUser(user._id, {
				username: "otro",
				email: "nuevo@mail.com",
			})
		).rejects.toThrow("ya está en uso");
	});
});
