import 'dotenv/config';
import express, { Application } from 'express';

import { indexRouter } from './routes/index.ts';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});
