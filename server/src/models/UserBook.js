// server\src\models\UserBook.js
const mongoose = require("mongoose");

const userBookSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	googleId: {
		type: String,
		default: null,
	},
	status: {
		type: String,
		enum: ["favorite"],
		default: "favorite",
	},
	listasUser: [String],
	libros: {
		googleId: String,
		listasLibro: [String],
	},
});

userBookSchema.index({ user: 1, googleId: 1, status: 1 }, { unique: true });

userBookSchema.methods.checkLista = async function checkLista(lista) {
	const found = false;
	const i = 0;
	while (found) {
		if (listasUser[i] == lista) {
			found = true;
			return found;
		}
		i++;
	}
};

module.exports = mongoose.model("userbook", userBookSchema);
