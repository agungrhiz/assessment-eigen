import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PenaltyDocument = HydratedDocument<Penalty>;

@Schema()
export class Penalty {
  @Prop({ required: true })
  memberCode: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ required: true })
  endedAt: Date;
}

export const PenaltySchema = SchemaFactory.createForClass(Penalty);
