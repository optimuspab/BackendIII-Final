import { devLogger, prodLogger } from '../config/logger.js';

const loggerMiddleware = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  req.logger = isProduction ? prodLogger : devLogger;
  next();
};

export default loggerMiddleware;
