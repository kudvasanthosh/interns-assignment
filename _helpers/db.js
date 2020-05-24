const mongoose=require('mongoose')
mongoose.connect(process.env.DB_MONGO,
    { useCreateIndex: true, useNewUrlParser: true ,useUnifiedTopology: true } , 
   () => {
    console.log('connect to DATABASE');
})

module.exports={
    Category:require('../models/category'),
    Product:require('../models/product'),
}