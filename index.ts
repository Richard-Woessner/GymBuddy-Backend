import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRouter from './src/v1/controllers/UserController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// parses incoming requests with JSON payloads
app.use(express.json());

/**
 * Routes.
 */
app.use('/api', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});