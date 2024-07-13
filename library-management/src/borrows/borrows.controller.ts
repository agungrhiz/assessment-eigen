import { Controller, Post, Body } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@ApiTags('borrows')
@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new borrow' })
  async borrowBook(@Body() createBorrowDto: CreateBorrowDto) {
    return await this.borrowsService.borrowBook(createBorrowDto);
  }

  @Post('/return')
  @ApiOperation({ summary: 'Return a borrowed book' })
  async returnBook(@Body() updateBorrowDto: UpdateBorrowDto) {
    return await this.borrowsService.returnBook(updateBorrowDto);
  }
}
