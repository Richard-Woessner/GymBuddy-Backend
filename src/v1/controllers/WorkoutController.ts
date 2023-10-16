import { Router } from 'express';
import { Firestore, doc, getDoc } from 'firebase/firestore';

const WorkoutController = async (db: Firestore) => {
    const router = Router();

    router
        .route('/workouts')
        // to create new resources
        .post((req, res, next) => {
            res.send('POST request to the homepage');
        })
        // to retrieve resource
        .get(async (req, res, next) => {
            const userId = '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2'; //Test user id
            const docRef = doc(db, 'Workouts', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                res.send(docSnap.data());
            } else {
                res.status(404).send('Workout not found');
            }
        });
    router
        .route('/users/:userId')
        // to retrieve a single resource
        .get((req, res, next) => {
            res.send('GET request to the homepage');
        });

    return router;
};

export default WorkoutController;
