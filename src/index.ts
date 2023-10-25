import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseSecret';
import { getAuth, signInAnonymously } from 'firebase/auth';
import WorkoutController from './v1/controllers/WorkoutController';
import UserController from './v1/controllers/UserController';
import FirebaseController from './v1/controllers/FirebaseController';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// parses incoming requests with JSON payloads
app.use(express.json());

app.use(cors({ origin: ['http://localhost:8081', 'https://origin2.com'] }));

/**
 * Routes.
 */
UserController(db).then((router) => {
    app.use('/api', router);
});

WorkoutController(db).then((router) => {
    app.use('/api', router);
});

FirebaseController(db).then((router) => {
    app.use('/api', router);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
