import { model, Schema } from 'mongoose';

const comfortTipSchema = new Schema(
  {
    category: { type: String, required: true },
    tip: { type: String, required: true },
  },
  { _id: false },
);

const feelingsSchema = new Schema(
  {
    states: { type: [String], required: true },
    sensationDescr: { type: String, required: true },
  },
  { _id: false },
);

const momStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true, unique: true },
    feelings: { type: feelingsSchema, required: true },
    comfortTips: { type: [comfortTipSchema], required: true },
  },
  {
    versionKey: false,
  },
);

export const MomState = model('MomState', momStateSchema);