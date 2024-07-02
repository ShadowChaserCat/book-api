import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './entity/books.dao';
import { CreateBookDto } from './dto/create-book.dto';
import { Sequelize } from 'sequelize-typescript';
import { Genres } from 'src/genres/entity/genres.dao';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books) private booksRepository: typeof Books,
    @InjectModel(Genres) private genresRepository: typeof Genres,
    private sequelize: Sequelize,
  ) {}

  async addBook(bookDto: CreateBookDto): Promise<Books> {
    const transaction = await this.sequelize.transaction();
    try {
      const existingBook = await this.booksRepository.findOne({
        where: {
          title: bookDto.title,
        },
      });

      if (existingBook) {
        throw new HttpException(
          `Книга с таким названием уже существует`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const newBook = await this.booksRepository.create(bookDto, {
        transaction,
      });
      const genres = await Promise.all(
        bookDto.genres.map(async (genreName) => {
          const [genre] = await this.genresRepository.findOrCreate({
            where: { name: genreName },
            transaction,
          });
          return genre;
        }),
      );

      await newBook.$set('genres', genres, { transaction });

      await transaction.commit();

      return newBook;
    } catch (e) {
      await transaction.rollback();
      console.error('Ошибка при добавлении книги:', e);
      throw new HttpException(
        'Ошибка при добавлении книги',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBooks() {
    try {
      const books = await this.booksRepository.findAll({
        include: {
          model: Genres,
          attributes: ['name'],
          through: { attributes: [] },
        },
      });
      return books;
    } catch (error) {
      throw new Error(`Failed to fetch books: ${error.message}`);
    }
  }

  async getBookById(id: number): Promise<Books> {
    try {
      console.log(id);
      const book = await this.booksRepository.findByPk(id, {
        include: ['genres'],
      });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new Error(`Failed to fetch book with id ${id}: ${error.message}`);
    }
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Books> {
    const transaction = await this.sequelize.transaction();
    try {
      const bookToUpdate = await this.booksRepository.findByPk(id, {
        transaction,
      });
      if (!bookToUpdate) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      bookToUpdate.title = updateBookDto.title;
      bookToUpdate.author = updateBookDto.author;
      bookToUpdate.publicationDate = updateBookDto.publicationDate;

      await bookToUpdate.save({ transaction });

      if (updateBookDto.genres && updateBookDto.genres.length > 0) {
        const existingGenres = await bookToUpdate.$get('genres', {
          transaction,
        });

        await bookToUpdate.$remove('genres', existingGenres, { transaction });

        const newGenres = await Promise.all(
          updateBookDto.genres.map(async (genreName) => {
            const [genre] = await this.genresRepository.findOrCreate({
              where: { name: genreName },
              transaction,
            });
            return genre;
          }),
        );

        await bookToUpdate.$add('genres', newGenres, { transaction });
      }

      await transaction.commit();
      return bookToUpdate;
    } catch (error) {
      await transaction.rollback();
      console.error('Error updating book:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBook(id: number): Promise<{ message: string }> {
    const transaction = await this.sequelize.transaction();
    try {
      const bookToDelete = await this.booksRepository.findByPk(id, {
        transaction,
      });
      if (!bookToDelete) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      await bookToDelete.destroy({ transaction });

      await transaction.commit();
      return { message: `Book with id ${id} has been deleted` };
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting book:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
