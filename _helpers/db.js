const mongoose=require('mongoose');
mongoose.connect(process.env.URL,{ useCreateIndex: true, useNewUrlParser: true ,useUnifiedTopology: true })

module.exports={
    Category:require('../models/category'),
    Product:require('../models/product')
}