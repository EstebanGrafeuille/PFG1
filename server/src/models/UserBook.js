// server\src\models\UserBook.js
const mongoose = require("mongoose");

const userBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listasUser:[String],
  libros:[{
    googleId: String,
    listasLibro: [String]
  }]
});

userBookSchema.methods.checkLista = async function checkLista(lista) {
	return this.listasUser.includes(lista);
};

module.exports = mongoose.model("userbook", userBookSchema);
