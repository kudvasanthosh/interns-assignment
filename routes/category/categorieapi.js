const express = require('express');
const router = express.Router();
// const Categorydb = require('../../models/category');

const db = require('../../helper/db');

const Categorydb = db.Category;

router.get('/category', function(req, res, next) {
    // res.send({ type: 'GET' });
    Categorydb.find({}).then(function(categoryvalue) {
        res.send(categoryvalue);
    })
});

router.post('/category', function(req, res, next) {
    Categorydb.create(req.body).then(function(categoryvalue) {
        res.send(categoryvalue);
    }).catch(next);
});

router.put('/category/:id', function(req, res, next) {
    res.send({ type: 'PUT' });
});

router.delete('/category/:id', function(req, res, next) {
    res.send({ type: 'DELETE' });
});

module.exports = router;