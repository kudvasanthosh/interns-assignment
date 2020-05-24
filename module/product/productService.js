const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');


const Category=db.Category;
const Product = db.Product;

module.exports = {
    getAll,
    create,
    update,
    getByProName,
    delete:removeProduct
};

async function getAll(queryParam) {
    let page=1;
    let numRecords=5;
    let matchQuery={};

   if(queryParam.page){
      page=parseInt(queryParam.page)
   }

   if(queryParam.numRecords){
    numRecords=parseInt(queryParam.numRecords)
   }

   let skip= (page-1)*numRecords;

    if(queryParam.productName){
        matchQuery.productName={  $regex: queryParam.productName, $options: "i"}
    }

    if(queryParam.productStatus){
        matchQuery.productStatus={  $eq: queryParam.productStatus}
    }

    

    let product= await Product.find(matchQuery).limit(numRecords).skip(parseInt(skip)).populate('productCategory').select({productName:1,productPrice:1})

    if(!product){
        return{"status":400,"message":"failed to fetch items"} ;
    }
    else{
        return{"status":200,"data":product} ;
    }
}
async function create(userParam) {
   try{
       const product=new Product(userParam);
       let productSaved=await product.save();
       if(productSaved){
           return{"status":200,"data":productSaved}
       }
       else
       {
           return{"status":400,"message":"failed to save the product"}
       }
   }
   catch(e){
       return{"status":400,"message":e.message}
   }
    
}
async function getById(productName){
    
  
}



async function update(productName,item){
    try{    
        const productId = await Product.findById(productName);

        // validate
        if (!productId) return { "status":404,"message":`User not found`}

        // copy courseParam properties to course
        Object.assign(productId, item);

        let productObj=await productId.save();

        // save user
        if(!productObj){
            return {"status":400,"message":"failed to update item"}
        }else{
            return {"status":200,"data":productObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}


async function getByProName(productName){
    try{    
        const productId = await Product.findById(productName);

        // validate
        if (!productId) { return  {"status":404,"message":`User not found`}}

       else{return {"status":200,"data":productId}}
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function removeProduct(productName){
    try{    
        let productObj= await Product.findByIdAndRemove(productName);
        if(!productObj){
            return {"status":400,"message":"failed to remove product"}
        }else{
            return {"status":200,"message":"product sucessfully removed"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}
