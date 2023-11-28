import { Router } from 'express';
import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { GetWorkoutsResponse } from '../models/Workouts';

const WorkoutController = async (db: Firestore) => {
    const router = Router();

    try {
        router
            .route('/workouts')
            // to create new resources
            .post(async (req, res, next) => {
                const request = req.body;

                console.log(req.body);

                await setDoc(doc(db, 'Workouts', request.userId), {
                    ...req.body.data,
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
                //TODO: Validate request
                const docId = req.query['userId'] as string;

                const docRef = doc(db, 'Workouts', docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    res.send(docSnap.data());
                } else {
                    res.status(404).send('Workout not found');
                }
            })
            // to retrieve resource
            .patch(async (req, res, next) => {
                //TODO: Validate request

                console.log(req.body);

                const docId = req.query['userId'] as string;

                const docRef = doc(db, 'Workouts', req.body.userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // res.send(docSnap.data());

                    const data = docSnap.data() as GetWorkoutsResponse;

                    data.Workouts.push(req.body.workout);

                    await setDoc(doc(db, 'Workouts', req.body.userId), {
                        ...data,
                    })
                        .then(() => {
                            console.log('Document successfully written!');
                            res.send('success');
                        })
                        .catch((error) => {
                            console.error('Error writing document: ', error);
                            res.status(500).send('error');
                        });
                } else {
                    res.status(404).send('Workout not found');
                }
            });
    } catch (error) {
        console.error(error);
    } finally {
        return router;
    }
};

export default WorkoutController;
