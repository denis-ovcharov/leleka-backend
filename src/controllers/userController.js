import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

export const updateCurrentUser = async (req, res) => {
  const { username, gender, dueDate, theme } = req.body;

  const updateFields = {};
  if (username !== undefined) updateFields.username = username.trim();
  if (gender !== undefined) updateFields.gender = gender;
  if (dueDate !== undefined) updateFields.dueDate = dueDate;
  if (theme !== undefined) updateFields.theme = theme;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    updateFields,
    { returnDocument: 'after' },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }
  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );

  res.status(200).json({ url: user.avatar });
};

export const updateUserTheme = async (req, res) => {
  const { theme } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { theme },
    { returnDocument: 'after' },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({ theme: user.theme });
};
