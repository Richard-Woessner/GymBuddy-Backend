import { Router } from 'express'

const router = Router()

router
    .route('/users')
    // to create new resources
    .post((req, res, next) => {
        res.send('POST request to the homepage')
    })
    // to retrieve resource
    .get((req, res, next) => {
        res.send('GET request to the homepage')
    })
router
    .route('/users/:userId')
    // to retrieve a single resource
    .get((req, res, next) => {
        res.send('GET request to the homepage')
    })

export default router
