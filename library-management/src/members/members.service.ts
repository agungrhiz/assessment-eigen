import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { BorrowsService } from 'src/borrows/borrows.service';
import { ListMemberDto } from './dto/list-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>,
    @Inject(forwardRef(() => BorrowsService))
    private borrowsService: BorrowsService,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const createdMember = new this.memberModel(createMemberDto);
    return await createdMember.save();
  }

  async findAll(): Promise<ListMemberDto[]> {
    const members = await this.memberModel.find().exec();
    const listMembers: ListMemberDto[] = [];
    for (const member of members) {
      const borrowedBooksCount = await this.borrowsService
        .findActiveBorrowsByMember(member.code)
        .then((borrows) => borrows.length);
      listMembers.push({
        code: member.code,
        name: member.name,
        borrowedBooksCount,
      });
    }
    return listMembers;
  }

  async findOne(code: string): Promise<Member> {
    return await this.memberModel.findOne({ code }).exec();
  }
}
