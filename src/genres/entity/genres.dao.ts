import {
  Model,
  Column,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { BooksGenres } from 'src/book_genres/entity/book_genres.dao';
import { Books } from 'src/books/entity/books.dao';

interface GenresCreationAttrs {
  title: string;
}

@Table({ tableName: 'genres' })
export class Genres extends Model<Genres, GenresCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Books, () => BooksGenres)
  books: Books[];
}
