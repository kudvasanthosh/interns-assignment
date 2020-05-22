require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./helper/error-handler');

// set up express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));


//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, authorization, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(errorHandler);
app.get('/', (req, res) => {
    res.send({ "message": "Api server" })
})

app.use(bodyParser.json());
app.use(express.static('public'));

// initialize router
app.use('/catapi', require('./routes/category/categoryController'));
app.use('/proapi', require('./routes/product/productController'));

// error handler
app.use(function(err, req, res, next) {
    res.send({ error: err.message });
})

app.listen(process.env.port || 1000, function() {
    console.log('now listener for request');
});