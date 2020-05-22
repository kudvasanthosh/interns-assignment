const express = require('express');
const router = express.Router();
// const Productdb = require('../../models/product');

const db = require('../../helper/db');
const Productdb = db.Product;

router.get('/product', function(req, res, next) {
    // res.send({ type: 'GET' });
    Productdb.find({}).then(function(categoryvalue) {
        res.send(categoryvalue);
    })
});

router.post('/product', function(req, res, next) {
    Productdb.create(req.body).then(function(categoryvalue) {
        res.send(categoryvalue);
    }).catch(next);
});

router.put('/product/:id', function(req, res, next) {
    res.send({ type: 'PUT' });
});

router.delete('/product/:id', function(req, res, next) {
    res.send({ type: 'DELETE' });
});

module.exports = router;