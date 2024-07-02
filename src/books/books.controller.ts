import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { Books } from './entity/books.dao';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksServices: BooksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(0b011)
  @Post()
  addBook(@Body() booksDto: CreateBookDto) {
    return this.booksServices.addBook(booksDto);
  }

  @Get()
  getAllBooks() {
    return this.booksServices.getBooks();
  }

  @Get(':id')
  async getBookById(@Param('id', ParseIntPipe) id: number): Promise<Books> {
    try {
      const book = await this.booksServices.getBookById(id);
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(0b001)
  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Books> {
    try {
      const updatedBook = await this.booksServices.updateBook(
        id,
        updateBookDto,
      );
      if (!updatedBook) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return updatedBook;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(0b001)
  @Delete(':id')
  async deleteBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    try {
      const deletedBook = await this.booksServices.deleteBook(id);
      if (!deletedBook) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return { message: `Book with id ${id} has been deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
