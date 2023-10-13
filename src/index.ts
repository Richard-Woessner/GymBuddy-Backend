import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usersRouter from './v1/controllers/UserController'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../firebaseSecret'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

dotenv.config()

const app: Express = express()
const port = process.env.PORT

// parses incoming requests with JSON payloads
app.use(express.json())

app.use(cors({ origin: ['http://localhost:8081', 'https://origin2.com'] }))

/**
 * Routes.
 */
app.use('/api', usersRouter(db))

console.log('test')

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
