import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Shows all existing books and quantities of books that are being borrowed are not counted',
  })
  async findAll() {
    return await this.booksService.findAll();
  }
}
