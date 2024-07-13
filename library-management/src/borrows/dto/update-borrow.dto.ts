import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBorrowDto {
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
  returnedAt: Date;
}
