import mongoose from 'mongoose';

export class BaseSchema {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
