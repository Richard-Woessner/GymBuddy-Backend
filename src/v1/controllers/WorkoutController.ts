import { Router } from 'express';
import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
            });
    } catch (error) {
        console.error(error);
    } finally {
        return router;
    }
};

export default WorkoutController;
