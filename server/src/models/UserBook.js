const mongoose = require('mongoose');

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

userBookSchema.methods.checkLista = async function checkLista(lista){
  const found = false;
  const i = 0;
  while (found){
    if(listasUser[i] == lista){
      found = true;
      return found;
    }
    i++;
  }
};


const UserBook = mongoose.model('userbook',userBookSchema)
module.exports = UserBook;
