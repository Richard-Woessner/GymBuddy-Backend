import { Router } from 'express'
import { Firestore, collection, getDocs } from 'firebase/firestore'

const UserWrapper = (db: Firestore) => {
    const userRef = collection(db, 'users')

    const router = Router()

    router
        .route('/users')
        // to create new resources
        .post((req, res, next) => {
            res.send('POST request to the homepage')
        })
        // to retrieve resource
        .get(async (req, res, next) => {
            console.log('get users')

            const querySnapshot = await getDocs(collection(db, 'Users'))

            let users: any[] = []

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data())
                users.push(doc.data())
            })

            res.send(users)
        })
    router
        .route('/users/:userId')
        // to retrieve a single resource
        .get((req, res, next) => {
            res.send('GET request to the homepage')
        })

    return router
}

export default UserWrapper
