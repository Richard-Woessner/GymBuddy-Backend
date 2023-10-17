import { Router } from 'express';
import {
    Firestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from 'firebase/firestore';
import { FirebaseRequest } from '../models/FirebaseRequest';

//This is for testing only, to be removed later

const FirebaseController = async (db: Firestore) => {
    const router = Router();

    router.route('/firebase').get(async (req, res, next) => {
        try {
            const firebaseRequest: FirebaseRequest = req.body;

            if (firebaseRequest.document) {
                //Get specific document
                const docRef = await getDoc(
                    doc(db, firebaseRequest.path, firebaseRequest.document)
                );

                if (docRef.exists()) {
                    res.send(docRef.data());
                } else {
                    res.status(404).send('Workout not found');
                }
            } else {
                //Get all documents in collection
                const data: any[] = [];

                const querySnapshot = await getDocs(
                    collection(db, firebaseRequest.path)
                );

                if (!querySnapshot) {
                    res.status(404).send('Document not found');
                    return;
                }

                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });

                res.send(data);
            }
        } catch (error) {
            console.error('Error getting document: ', error);
            res.status(500).send('error');
        }
    });

    return router;
};

export default FirebaseController;
