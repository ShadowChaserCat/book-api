import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksService } from './books.service';
import { Books } from './entity/books.dao';
import { Genres } from 'src/genres/entity/genres.dao';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [SequelizeModule.forFeature([Books, Genres]), AuthModule],
})
export class BooksModule {}
