import express from 'express';
import usersRouter from './routes/users.js';
import mocksRouter from './routes/mocks.router.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import requestLogger from './middlewares/requestLogger.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const MONGO_CERT_PATH = resolve(__dirname, process.env.MONGO_CERT_PATH);

mongoose
  .connect(process.env.MONGO_URI, {
    tlsCertificateKeyFile: MONGO_CERT_PATH,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado correctamente.');
});

mongoose.connection.on('error', (err) => {
  console.error('Error al conectar con MongoDB:', err);
});

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/mocks', mocksRouter);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

export default app;
