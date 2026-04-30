import createHttpError from 'http-errors';
import { Diary } from '../models/diary.js';
import { Emotion } from '../models/emotion.js';
import {
  getSupportedDateTimestamp,
  normalizeDateToIso,
} from '../utils/date.js';

const INVALID_EMOTIONS_MESSAGE =
  'Invalid emotions: must be valid emotion titles from database';
const INVALID_DIARY_DATE_MESSAGE = 'Invalid date: use DD.MM.YYYY or YYYY-MM-DD';

const tryParseEmotionArrayString = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue.startsWith('[') || !trimmedValue.endsWith(']')) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(trimmedValue);
    return Array.isArray(parsedValue) ? parsedValue : null;
  } catch {
    const singleQuotedItems = [...trimmedValue.matchAll(/'([^']+)'/g)].map(
      (match) => match[1].trim(),
    );

    return singleQuotedItems.length > 0 ? singleQuotedItems : null;
  }
};

const normalizeEmotionTitles = (emotions) =>
  emotions
    .flatMap((emotion) => {
      if (typeof emotion !== 'string') {
        return [];
      }

      const parsedEmotionArray = tryParseEmotionArrayString(emotion);

      if (parsedEmotionArray) {
        return parsedEmotionArray;
      }

      return emotion.trim();
    })
    .filter(Boolean);

const resolveEmotionIds = async (emotions) => {
  const emotionTitles = normalizeEmotionTitles(emotions);

  if (emotionTitles.length === 0 || emotionTitles.length > 12) {
    throw createHttpError(400, INVALID_EMOTIONS_MESSAGE);
  }

  const uniqueEmotionTitles = [...new Set(emotionTitles)];

  if (uniqueEmotionTitles.length !== emotionTitles.length) {
    throw createHttpError(400, INVALID_EMOTIONS_MESSAGE);
  }

  const emotionDocs = await Emotion.find({
    title: { $in: emotionTitles },
  }).select('_id title');

  if (emotionDocs.length !== emotionTitles.length) {
    throw createHttpError(400, INVALID_EMOTIONS_MESSAGE);
  }

  const emotionIdByTitle = new Map(
    emotionDocs.map((emotion) => [emotion.title, emotion._id]),
  );

  return emotionTitles.map((title) => emotionIdByTitle.get(title));
};

export const createDiary = async (req, res) => {
  const { title, description, date, emotions } = req.body;
  const emotionIds = await resolveEmotionIds(emotions);
  const normalizedDate = date
    ? normalizeDateToIso(date)
    : new Date().toISOString().split('T')[0];

  if (!normalizedDate) {
    throw createHttpError(400, INVALID_DIARY_DATE_MESSAGE);
  }

  const diary = await Diary.create({
    userId: req.user._id,
    title,
    description,
    date: normalizedDate,
    emotions: emotionIds,
  });

  await diary.populate('emotions');
  res.status(201).json(diary);
};

export const getDiaries = async (req, res) => {
  const diaries = await Diary.find({ userId: req.user._id }).populate(
    'emotions',
  );

  diaries.sort((leftDiary, rightDiary) => {
    const leftTimestamp = getSupportedDateTimestamp(leftDiary.date) ?? 0;
    const rightTimestamp = getSupportedDateTimestamp(rightDiary.date) ?? 0;

    return rightTimestamp - leftTimestamp;
  });

  res.status(200).json(diaries);
};

export const updateDiary = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, emotions } = req.body;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (date !== undefined) {
    const normalizedDate = normalizeDateToIso(date);

    if (!normalizedDate) {
      throw createHttpError(400, INVALID_DIARY_DATE_MESSAGE);
    }

    updateFields.date = normalizedDate;
  }
  if (emotions !== undefined) {
    updateFields.emotions = await resolveEmotionIds(emotions);
  }

  const diary = await Diary.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    updateFields,
    { returnDocument: 'after', runValidators: true },
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
