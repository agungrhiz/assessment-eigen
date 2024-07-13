import { Module } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PenaltySchema } from './schema/penalty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Penalty', schema: PenaltySchema }]),
  ],
  providers: [PenaltiesService],
  exports: [PenaltiesService],
})
export class PenaltiesModule {}
