import {
  Model,
  Column,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { BooksGenres } from 'src/book_genres/entity/book_genres.dao';
import { Genres } from 'src/genres/entity/genres.dao';

interface BooksCreationAttrs {
  author: string;

  title: string;

  publicationDate: Date;
}

@Table({ tableName: 'books' })
export class Books extends Model<Books, BooksCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  author: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.DATE,
  })
  publicationDate: Date;

  @BelongsToMany(() => Genres, () => BooksGenres)
  genres: Genres[];
}
