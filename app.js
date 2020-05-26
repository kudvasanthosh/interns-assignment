require('dotenv').config();
const express = require('express');
const bodyparser=require('body-parser')
const errorHandler=require('./_helpers/error-handler');
const http = require('http');
const app = express()
const server = http.createServer(app);


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json({limit:'1mb'}));

app.use( (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, authorization, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.use(errorHandler);
app.get('/', (req, res) => {
    res.send({"message":"Api server"})
})


app.use('/category',require('./routes/category/categoryController'));
app.use('/product',require('./routes/product/productController'));

const port=process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Listening on port  ${process.env.PORT}`);
});