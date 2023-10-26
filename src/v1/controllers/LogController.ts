import { Router } from 'express';
import {
    Firestore,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';

const LogsController = async (db: Firestore) => {
    const router = Router();

    try {
        router
            .route('/logs')
            // to create new resources
            .post(async (req, res, next) => {
                const request = req.body;

                console.log(req.body);

                const q = query(
                    collection(db, 'Logs'),
                    where('userId', '==', request.userId)
                );

                const docs = await getDocs(q);

                let docId = '';

                if (docs.empty) {
                    console.log('No matching documents.');

                    await addDoc(collection(db, 'Logs'), {
                        userId: request.userId,
                    }).then((docRef) => {
                        console.log('Document written with ID: ', docRef.id);
                        docId = docRef.id;
                    });
                } else {
                    docId = docs.docs[0].id;
                }

                addDoc(collection(db, 'Logs', docId, 'CompletedWorkouts'), {
                    ...request.data,
                }).then(() => {
                    console.log('Document successfully written!');
                    res.send('success');
                });
            })
            // to retrieve resource
            .get(async (req, res, next) => {
                const userId = req.query['userId'] as string;

                //This is how you query a collection

                const q = query(
                    collection(db, 'Logs'),
                    where('userId', '==', userId)
                );

                const logsArr: any[] = [];

                getDocs(q)
                    .then(async (querySnapshot) => {
                        const doc = querySnapshot.docs[0];

                        //create subcollection reference
                        let subCollectionDocs = collection(
                            db,
                            'Logs',
                            doc.id,
                            'CompletedWorkouts'
                        );

                        const tempSubDocs: any[] = [];

                        //get subcollection documents
                        await getDocs(subCollectionDocs).then((docs) => {
                            docs.forEach((doc) => {
                                tempSubDocs.push(doc.data());
                            });
                        });

                        //add subcollection documents to main document
                        logsArr.push({
                            ...doc.data(),
                            completedWorkouts: tempSubDocs,
                        });
                    })
                    .then((r) => {
                        console.log(r);
                    })
                    .finally(() => {
                        //send response after all async calls are done
                        res.send(logsArr);
                    });
            });
    } catch (error) {
        console.error(error);
    } finally {
        return router;
    }
};

export default LogsController;
