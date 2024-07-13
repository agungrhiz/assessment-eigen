import { forwardRef, Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowSchema } from './schemas/borrow.schema';
import { MembersModule } from 'src/members/members.module';
import { BooksModule } from 'src/books/books.module';
import { PenaltiesModule } from 'src/penalties/penalties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Borrow', schema: BorrowSchema }]),
    forwardRef(() => BooksModule),
    forwardRef(() => MembersModule),
    PenaltiesModule,
  ],
  controllers: [BorrowsController],
  providers: [BorrowsService],
  exports: [BorrowsService],
})
export class BorrowsModule {}
