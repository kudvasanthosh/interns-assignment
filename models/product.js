const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const productSchema=new Schema({
    productname:{type:String,required:true},
    productprice:{type:Number,required:true},
    status:{type:Boolean,default:false},
    productcategory:{type:Schema.Types.ObjectId,ref:'Category',index:true,required:true},
    createdAt:{type:Date,default:Date.now}
})


module.exports = mongoose.model('Product', productSchema);