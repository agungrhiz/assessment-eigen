import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  memberCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bookCode: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  borrowedAt: Date;
}
