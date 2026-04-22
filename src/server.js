import express from 'express';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import diaryRoutes from './routes/diaryRoutes.js';
import weeksRoutes from './routes/weeksRoutes.js';
import emotionRoutes from './routes/emotionRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);
app.use(diaryRoutes);
app.use(weeksRoutes);
app.use(emotionRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
