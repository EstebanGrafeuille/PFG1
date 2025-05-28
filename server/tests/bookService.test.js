const BookService = require("../src/services/BookService");
const UserBook = require("../src/models/UserBook");
const User = require("../src/models/User");

describe("BookService – Favoritos con googleId", () => {
	let userId;
	const googleId = "zyTCAlFPjgYC";

	beforeEach(async () => {
		const user = await User.create({
			username: "pepe",
			email: "pepe@mail.com",
			password: "123456",
		});
		userId = user._id;
	});

	it("agrega un googleId a favoritos", async () => {
		await BookService.addToFavorites(userId, googleId);

		// Comprueba que exista el doc
		const favDoc = await UserBook.findOne({ user: userId, googleId });
		expect(favDoc).not.toBeNull();

		// Comprueba que getFavorites lo devuelva
		const favs = await BookService.getFavorites(userId);
		expect(favs).toEqual([googleId]);
	});

	it("lanza error si el libro ya está en favoritos", async () => {
		await BookService.addToFavorites(userId, googleId);
		await expect(BookService.addToFavorites(userId, googleId)).rejects.toThrow(
			"El libro ya está en favoritos"
		);
	});
});
