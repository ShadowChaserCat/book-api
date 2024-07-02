import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { Users } from './users/entity/users.dao';
import { Books } from './books/entity/books.dao';
import { BooksModule } from './books/books.module';
import { GenresService } from './genres/genres.service';
import { GenresModule } from './genres/genres.module';
import { Genres } from './genres/entity/genres.dao';
import { BooksGenres } from './book_genres/entity/book_genres.dao';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRootAsync({
      useFactory: async () => ({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [Users, Books, Genres, BooksGenres],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    BooksModule,
    GenresModule,
    AuthModule,
  ],
  controllers: [],
  providers: [GenresService],
  exports: [],
})
export class AppModule {}
