import { Router } from 'express';
import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore';

const WorkoutController = async (db: Firestore) => {
    const router = Router();

    const userId = '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2'; //Test user id

    router
        .route('/workouts')
        // to create new resources
        .post(async (req, res, next) => {
            await setDoc(doc(db, 'Workouts', userId), {
                ...req.body,
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
