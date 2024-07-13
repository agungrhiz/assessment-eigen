import { Controller, Post, Body, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListMemberDto } from './dto/list-member.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  async create(@Body() createMemberDto: CreateMemberDto) {
    return await this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Shows all existing members and The number of books being borrowed by each member',
  })
  async findAll(): Promise<ListMemberDto[]> {
    return await this.membersService.findAll();
  }
}
