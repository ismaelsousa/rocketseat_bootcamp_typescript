import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/RateLimiter';

import routes from './routes';

// Container faz a injeção de dependencias
import '@shared/container';
import '@shared/infra/typeorm';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server erros',
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`(((((((((((((((${port})))))))))))))))`);
});
