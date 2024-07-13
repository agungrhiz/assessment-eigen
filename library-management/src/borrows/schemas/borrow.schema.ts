import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BorrowDocument = HydratedDocument<Borrow>;

@Schema()
export class Borrow {
  @Prop({ required: true })
  memberCode: string;

  @Prop({ required: true })
  bookCode: string;

  @Prop({ required: true })
  borrowedAt: Date;

  @Prop()
  returnedAt: Date;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);
