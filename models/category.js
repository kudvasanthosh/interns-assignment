const mongoose=require('mongoose')
const Schema=mongoose.Schema

const CategorySchema=new Schema({
    categoryName:{
        type : String,
        required:true,
       
    },

    categoryStatus:{
        type:Boolean,
        default:false
    },
    categoryDate:{
        type:Date,
        required:true,
        default: () => Date.now() 
    },
})
const Category=mongoose.model('category',CategorySchema)
module.exports = Category;