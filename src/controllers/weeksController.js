import { MomState } from '../models/momState.js';
import { BabyState } from '../models/babyState.js';
import { ONE_DAY } from '../constants/time.js';

const MAX_WEEK = 40;

const getWeekNumberFromDueDate = (dueDate) => {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / ONE_DAY);

  if (diffDays < 0) return MAX_WEEK;

  const daysPregnant = 280 - diffDays;
  const weekNumber = Math.ceil(daysPregnant / 7);

  return Math.min(Math.max(weekNumber, 1), MAX_WEEK);
};

const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due - now;
  return Math.ceil(diffTime / ONE_DAY);
};

export const getWeeksPublic = async (req, res) => {
  const { week } = req.query;

  if (!week || week < 1 || week > MAX_WEEK) {
    return res.status(200).json({
      weekNumber: 1,
      daysUntilDue: null,
      tipForMom: null,
      babyInfo: null,
    });
  }

  const weekNum = parseInt(week, 10);
  const momState = await MomState.findOne({ weekNumber: weekNum });
  const babyState = await BabyState.findOne({ weekNumber: weekNum });

  res.status(200).json({
    weekNumber: weekNum,
    daysUntilDue: null,
    tipForMom: momState?.comfortTips?.[0]?.tip || null,
    babyInfo: babyState
      ? {
          analogy: babyState.analogy,
          image: babyState.image,
          development: babyState.babyDevelopment,
        }
      : null,
  });
};

export const getWeeksPrivate = async (req, res) => {
  const { dueDate, gender } = req.user;
  const weekNumber = getWeekNumberFromDueDate(dueDate);
  const daysUntilDue = getDaysUntilDue(dueDate);

  const momState = weekNumber ? await MomState.findOne({ weekNumber }) : null;
  const babyState = weekNumber ? await BabyState.findOne({ weekNumber }) : null;

  res.status(200).json({
    weekNumber: weekNumber || 1,
    daysUntilDue,
    tipForMom: momState?.comfortTips?.[0]?.tip || null,
    babyInfo: babyState
      ? {
          gender: gender,
          analogy: babyState.analogy,
          image: babyState.image,
          development: babyState.babyDevelopment,
          size: babyState.babySize,
          weight: babyState.babyWeight,
        }
      : null,
  });
};

export const getBabyInfo = async (req, res) => {
  const { week } = req.params;

  const weekNum = parseInt(week, 10);
  if (!weekNum || weekNum < 1 || weekNum > MAX_WEEK) {
    return res.status(404).json({ error: 'Invalid week number' });
  }

  const babyState = await BabyState.findOne({ weekNumber: weekNum });

  if (!babyState) {
    return res.status(404).json({ error: 'Baby state not found' });
  }

  res.status(200).json(babyState);
};

export const getMomInfo = async (req, res) => {
  const { week } = req.params;

  const weekNum = parseInt(week, 10);
  if (!weekNum || weekNum < 1 || weekNum > MAX_WEEK) {
    return res.status(404).json({ error: 'Invalid week number' });
  }

  const momState = await MomState.findOne({ weekNumber: weekNum });

  if (!momState) {
    return res.status(404).json({ error: 'Mom state not found' });
  }

  res.status(200).json(momState);
};
