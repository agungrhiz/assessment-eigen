import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Borrow } from './schemas/borrow.schema';
import { Model } from 'mongoose';
import { MembersService } from 'src/members/members.service';
import { BooksService } from 'src/books/books.service';
import { PenaltiesService } from 'src/penalties/penalties.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectModel(Borrow.name) private borrowModel: Model<Borrow>,
    @Inject(forwardRef(() => BooksService)) private booksService: BooksService,
    @Inject(forwardRef(() => MembersService))
    private membersService: MembersService,
    private penaltiesService: PenaltiesService,
  ) {}

  async borrowBook(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    const { memberCode, bookCode, borrowedAt } = createBorrowDto;

    const member = await this.membersService.findOne(memberCode);
    const book = await this.booksService.findOne(bookCode);
    if (!member || !book) {
      throw new BadRequestException('Member or book not found');
    }

    if (book.stock <= 0) {
      throw new BadRequestException('Book is out of stock');
    }

    const borrowedBooks = await this.findActiveBorrowsByMember(memberCode);
    if (borrowedBooks.length >= 2) {
      throw new BadRequestException('Member cannot borrow more than 2 books');
    }

    const borrowedBook = await this.findActiveBorrowsByBook(bookCode);
    if (borrowedBook.length > 0) {
      throw new BadRequestException('Book is currently being borrowed');
    }

    const penalties = await this.penaltiesService.findActivePenalties(
      memberCode,
    );
    if (penalties.length > 0) {
      throw new BadRequestException('Member is currently being penalized');
    }

    const createdBorrow = new this.borrowModel({
      memberCode,
      bookCode,
      borrowedAt,
    });
    return await createdBorrow.save();
  }

  async returnBook(updateBorrowDto: UpdateBorrowDto): Promise<Borrow> {
    const { memberCode, bookCode, returnedAt } = updateBorrowDto;
    const borrow = await this.borrowModel
      .findOne({
        memberCode,
        bookCode,
        returnedAt: null,
      })
      .exec();

    if (!borrow) {
      throw new BadRequestException('Borrow record not found');
    }

    const returnedAtDate = new Date(returnedAt);
    const borrowedAtDate = new Date(borrow.borrowedAt);
    const daysDiff = Math.floor(
      (returnedAtDate.getTime() - borrowedAtDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysDiff > 7) {
      const penalty = await this.penaltiesService.createPenalty(memberCode);
      if (!penalty) {
        throw new BadRequestException('Failed to create penalty');
      }
    }

    borrow.returnedAt = returnedAt;
    return await borrow.save();
  }

  async findActiveBorrowsByMember(memberCode: string): Promise<Borrow[]> {
    return await this.borrowModel
      .find({
        memberCode,
        returnedAt: null,
      })
      .exec();
  }

  async findActiveBorrowsByBook(bookCode: string): Promise<Borrow[]> {
    return await this.borrowModel
      .find({
        bookCode,
        returnedAt: null,
      })
      .exec();
  }
}
