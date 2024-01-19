import express, { Express, Request, Response } from 'express';
import ws from 'ws';
import dotenv from 'dotenv';
import cors from 'cors';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseSecret';
import { getAuth, signInAnonymously } from 'firebase/auth';
import WorkoutController from './v1/controllers/WorkoutController';
import UserController from './v1/controllers/UserController';
import FirebaseController from './v1/controllers/FirebaseController';
import LogsController from './v1/controllers/LogController';
import WebSocketWrapper from './v1/WebSocket';
import { urlParamsToArray } from './functions/func';
import { log } from 'console';

// Initialize Firebase
log(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

dotenv.config();

const app: Express = express();
const port = 8000;

const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket, incoming) => {
    const params = urlParamsToArray(incoming.url!);

    WebSocketWrapper(socket, params);
});

// parses incoming requests with JSON payloads
app.use(express.json());

app.use(
    cors({
        origin: [
            'http://localhost:8081',
            'http://localhost:3000',
            'https://origin2.com',
        ],
    })
);

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

LogsController(db).then((router) => {
    app.use('/api', router);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request);
    });
});
