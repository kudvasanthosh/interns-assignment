const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Category = require('./category');

const ProductSchema=new Schema({
    productName:{
        type : String,
        required:true,
        min:3
    },
    productPrice:{
        type : Number,
        required:true,
       
    },
    productCategory: [
        { 
            type : Schema.Types.ObjectId, 
            ref: Category,
            required:true
         }
    ]
    ,
    productStatus:{
        type : Boolean,
    },
    productDate:{
        type : Date,
        required:"set the date",
        default: () => Date.now() 
    },
});




const Product=mongoose.model('product',ProductSchema)

module.exports = Product;
