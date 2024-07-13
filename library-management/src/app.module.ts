import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowsModule } from './borrows/borrows.module';
import { PenaltiesModule } from './penalties/penalties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/library-management'),
    BooksModule,
    MembersModule,
    BorrowsModule,
    PenaltiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
