import { Schema, model } from 'mongoose';

const babyStateSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      require: true,
      unique: true,
      min: 1,
      max: 42,
    },
    analogy: { type: String, default: null, trim: true },
    babySize: { type: Number, default: 0 },
    babyWeight: { type: Number, default: 0 },
    image: { type: String, trim: true },
    babyActivity: { type: String, trim: true },
    babyDevelopment: { type: String, trim: true },
    interestingFact: { type: String, trim: true },
    momDailyTips: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: 'baby_states',
  },
);

export const BabyState = model('BabyState', babyStateSchema);
