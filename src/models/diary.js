import { model, Schema, SchemaTypes } from 'mongoose';

const diarySchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      min: 1,
      max: 64,
    },
    description: {
      type: String,
      required: true,
      min: 1,
      max: 1000,
    },
    date: {
      type: String,
    },
    emotions: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: 'Emotion',
        },
      ],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0 && arr.length <= 12;
        },
        message:
          'Emotions are required and must contain between 1 and 12 items',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Diary = model('Diary', diarySchema);
