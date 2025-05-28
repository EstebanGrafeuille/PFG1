const BookService = require('../src/services/BookService');
const Book = require('../src/models/Book');
const UserBook = require('../src/models/UserBook');
const User = require('../src/models/User');

describe('BookService CRUD', () => {
  let userId, libro;

  beforeEach(async () => {
    const user = await User.create({
      username: 'pepe',
      email: 'pepe@mail.com',
      password: '123456'
    });
    userId = user._id;

    libro = await Book.create({
      googleId: 'g123',
      title: 'Libro Test',
      authors: ['Autor Uno'],
      description: 'desc',
      thumbnail: '',
      pageCount: 100,
      categories: ['Test'],
      publishedDate: '2020-01-01'
    });
  });

  it('guarda un libro nuevo si no existe', async () => {
    const data = { ...libro.toObject(), googleId: 'g456', title: 'Nuevo' };
    const saved = await BookService.saveBook(data);

    expect(saved.googleId).toBe('g456');
    const count = await Book.countDocuments();
    expect(count).toBe(2);
  });

  it('no duplica un libro ya existente', async () => {
    const saved = await BookService.saveBook(libro.toObject());

    expect(saved._id.toString()).toBe(libro._id.toString());
    const count = await Book.countDocuments();
    expect(count).toBe(1);
  });

  describe('Favoritos', () => {
    it('agrega a favoritos y luego lo devuelve', async () => {
      await BookService.addToFavorites(userId, libro._id);
      const favoritos = await BookService.getFavorites(userId);

      expect(favoritos).toHaveLength(1);
      expect(favoritos[0]._id.toString()).toBe(libro._id.toString());
    });

    it('lanza error si el libro ya está en favoritos', async () => {
      await BookService.addToFavorites(userId, libro._id);
      await expect(
        BookService.addToFavorites(userId, libro._id)
      ).rejects.toThrow('El libro ya está en favoritos');
    });

    it('lanza error si el libro no existe', async () => {
      const idFake = '613b6d3f99fb3309dd8ddee9';
      await expect(
        BookService.addToFavorites(userId, idFake)
      ).rejects.toThrow('Libro no encontrado');
    });
  });
});