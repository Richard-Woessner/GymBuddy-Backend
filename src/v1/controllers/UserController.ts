import { Router } from 'express';
import {
    Firestore,
    collection,
    doc,
    getDocs,
    setDoc,
} from 'firebase/firestore';
import { PostUserRequest } from '../models/UserModels';

const UserController = async (db: Firestore) => {
    const router = Router();

    router
        .route('/users')
        // to create new resources
        .post(async (req, res, next) => {
            const request = req.body as PostUserRequest;

            const docId = crypto.randomUUID();

            await setDoc(doc(db, 'Users', docId), {
                ...request,
            })
                .then(() => {
                    console.log('Document successfully written!');
                    res.send('success');
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    res.status(500).send('error');
                });
        })
        // to retrieve resource
        .get(async (req, res, next) => {
            console.log('get users');

            const querySnapshot = await getDocs(collection(db, 'Users'));

            let users: any[] = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
                users.push(doc.data());
            });

            res.send(users);
        });
    router
        .route('/users/:userId')
        // to retrieve a single resource
        .get((req, res, next) => {
            res.send('GET request to the homepage');
        });

    return router;
};

export default UserController;
