import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { BorrowsService } from 'src/borrows/borrows.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @Inject(forwardRef(() => BorrowsService))
    private borrowsService: BorrowsService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return await createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
    for (const book of books) {
      const borrowedBooks = await this.borrowsService.findActiveBorrowsByBook(
        book.code,
      );
      book.stock = book.stock - borrowedBooks.length;
    }
    return books;
  }

  async findOne(code: string): Promise<Book> {
    return await this.bookModel.findOne({ code }).exec();
  }
}
