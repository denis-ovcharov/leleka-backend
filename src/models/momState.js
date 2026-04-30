import { Schema, model } from 'mongoose';

const comfortTipSchema = new Schema(
  {
    category: { type: String, required: true, trim: true },
    tip: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const feelingsSchema = new Schema(
  {
    states: { type: [String], default: [] },
    sensationDescr: { type: String, trim: true },
  },
  { _id: false },
);

const momStateSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 42,
    },
    feelings: { type: feelingsSchema, default: () => ({}) },
    comfortTips: { type: [comfortTipSchema], default: [] },
  },
  { timestamps: true, collection: 'mom_states' },
);

export const MomState = model('MomState', momStateSchema);
