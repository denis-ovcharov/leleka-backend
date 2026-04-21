import { model, Schema, SchemaTypes } from 'mongoose';

const taskSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      min: 1,
      max: 96,
    },
    date: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Task = model('Task', taskSchema);