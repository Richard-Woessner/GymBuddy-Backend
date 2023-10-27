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
import { log } from '../../functions/func';

const LogsController = async (db: Firestore) => {
    const router = Router();

    try {
        router
            .route('/logs')
            // to create new resources
            .post(async (req, res, next) => {
                try {
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
                            console.log(
                                'Document written with ID: ',
                                docRef.id
                            );
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
                } catch (error) {
                    console.error('Post Log Error');
                    console.error(error);
                    res.status(500).send(error);
                }
            })
            // to retrieve resource
            .get(async (req, res, next) => {
                console.log('get Logs');

                const userId = req.query['userId'] as string;

                //This is how you query a collection

                const q = query(
                    collection(db, 'Logs'),
                    where('userId', '==', userId)
                );

                const logsArr: any[] = [];

                getDocs(q)
                    .then(async (querySnapshot) => {
                        if (querySnapshot.empty) {
                            res.status(404).send('No matching documents.');
                        }

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
                            log(
                                'subcollection docs for account ' + userId,
                                '#bada55'
                            );

                            docs.forEach((doc) => {
                                tempSubDocs.push(doc.data());
                            });

                            //add subcollection documents to main document
                            logsArr.push({
                                ...doc.data(),
                                completedWorkouts: tempSubDocs,
                            });
                        });
                    })
                    .finally(() => {
                        res.send(logsArr[0]);
                    });
            });
    } catch (error) {
        console.error(error);
    } finally {
        return router;
    }
};

export default LogsController;
