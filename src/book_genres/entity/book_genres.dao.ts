import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Books } from '../../books/entity/books.dao';
import { Genres } from '../../genres/entity/genres.dao';

@Table({ tableName: 'books_genres', createdAt: false, updatedAt: false })
export class BooksGenres extends Model<BooksGenres> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Books)
  @Column({
    type: DataType.INTEGER,
  })
  bookId: number;

  @ForeignKey(() => Genres)
  @Column({
    type: DataType.INTEGER,
  })
  genreId: number;
}
