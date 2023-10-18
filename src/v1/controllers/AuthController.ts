import { Router } from 'express';
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    signInAnonymously,
} from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

const AuthController = async (db: Firestore, auth: Auth, admin: App) => {
    const router = Router();

    router.route('/auth/createAnonymousUser').post(async (req, res, next) => {
        try {
            signInAnonymously(auth)
                .then((user) => {
                    console.log(user);

                    console.log('anonynous sign in success');
                    res.send(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    throw new Error(`Error: ${errorCode} - ${errorMessage}`);
                });
        } catch (error) {
            console.error('Error signing in: ', error);
        }
    });

    router.route('/auth/createUser').post(async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if (!email || !password) {
                res.status(400).send('email and password required');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(userCredential.user);

            res.send(userCredential.user);
        } catch (error) {
            console.error('Error signing in: ', error);
        }
    });

    router.route('/auth/validateUser').post(async (req, res, next) => {
        const idToken = req.body.idToken;
        try {
            const currentUser = getAuth().currentUser;

            res.send('success');
        } catch (error) {
            console.error('Error signing in: ', error);
            res.status(500).send('error');
        }
    });

    return router;
};

export default AuthController;
