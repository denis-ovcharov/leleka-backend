import createHttpError from 'http-errors';
import { Diary } from '../models/diary.js';

export const createDiary = async (req, res) => {
  const { title, description, date, emotions } = req.body;

  const diary = await Diary.create({
    userId: req.user._id,
    title,
    description,
    date: date || new Date().toISOString().split('T')[0],
    emotions,
  });

  res.status(201).json(diary);
};

export const getDiaries = async (req, res) => {
  const diaries = await Diary.find({ userId: req.user._id })
    .populate('emotions')
    .sort({ date: -1 });

  res.status(200).json(diaries);
};

export const updateDiary = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, emotions } = req.body;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (date !== undefined) updateFields.date = date;
  if (emotions !== undefined) updateFields.emotions = emotions;

  const diary = await Diary.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    updateFields,
    { returnDocument: 'after' },
  ).populate('emotions');

  if (!diary) {
    throw createHttpError(404, 'Diary not found');
  }

  res.status(200).json(diary);
};

export const deleteDiary = async (req, res) => {
  const { id } = req.params;

  const diary = await Diary.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!diary) {
    throw createHttpError(404, 'Diary not found');
  }

  res.status(204).send();
};