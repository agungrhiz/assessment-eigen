import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Penalty } from './schema/penalty.schema';
import { Model } from 'mongoose';

@Injectable()
export class PenaltiesService {
  constructor(
    @InjectModel(Penalty.name) private penaltyModel: Model<Penalty>,
  ) {}

  async createPenalty(memberCode: string): Promise<Penalty> {
    const startedAt = new Date();
    const endedAt = new Date(startedAt.getTime() + 3 * 24 * 60 * 60 * 1000);

    const createdPenalty = new this.penaltyModel({
      memberCode,
      startedAt,
      endedAt,
    });
    return await createdPenalty.save();
  }

  async findActivePenalties(memberCode: string): Promise<Penalty[]> {
    const now = new Date();
    return await this.penaltyModel
      .find({
        memberCode,
        endedAt: { $gte: now },
      })
      .exec();
  }
}
