import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import router from './routers/numbers.js';
import { routeNotFoundHandler } from './middlewares/routeNotFoundHandler.js';
import { errorHandler } from './middlewares/internalErrorHandler.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  })
);

app.use('/api', router);

app.use(routeNotFoundHandler);

app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
