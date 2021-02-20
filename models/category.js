const mongoose=require('mongoose');
const Schema= mongoose.Schema;


const categorySchema=new Schema({
    categoryname:{type:String,required:true},
    status:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now,required:true}
})


module.exports = mongoose.model('Category', categorySchema);