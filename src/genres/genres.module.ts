import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genres } from './entity/genres.dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from 'src/books/entity/books.dao';
import { BooksGenres } from 'src/book_genres/entity/book_genres.dao';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [SequelizeModule.forFeature([Genres, Books, BooksGenres])],
})
export class GenresModule {}
