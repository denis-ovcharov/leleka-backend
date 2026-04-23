import { model, Schema, SchemaTypes } from 'mongoose';
import { Emotion } from './emotion.js';

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
      required: true,
    },
    emotions: {
      type: [SchemaTypes.ObjectId],
      ref: 'Emotion',
      validate: {
        validator: async function (arr) {
          if (!arr || arr.length === 0) {
            return false;
          }
          if (arr.length > 12) {
            return false;
          }
          const count = await Emotion.countDocuments({ title: { $in: arr } });
          return count === arr.length;
        },
        message: 'Invalid emotions: must be valid emotion titles from database',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

diarySchema.pre('save', async function () {
  if (this.emotions && this.emotions.length > 0) {
    const emotionDocs = await Emotion.find({ title: { $in: this.emotions } });
    this.emotions = emotionDocs.map((e) => e._id);
  }
});

export const Diary = model('Diary', diarySchema);