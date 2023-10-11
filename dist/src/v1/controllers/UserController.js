"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('/users')
    // to create new resources
    .post((req, res, next) => {
    res.send('POST request to the homepage');
})
    // to retrieve resource
    .get((req, res, next) => {
    res.send('GET request to the homepage');
});
router
    .route('/users/:userId')
    // to retrieve a single resource
    .get((req, res, next) => {
    res.send('GET request to the homepage');
});
exports.default = router;
