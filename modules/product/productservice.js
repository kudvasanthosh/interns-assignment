const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');

const Product=db.Product;
const Category=db.Category;

module.exports = {
    getall,
    getbyproductname,
    create,
    update,
    delete:removeitem
};


async function getall(queryParam)
{
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

    if(queryParam.productname){
        matchQuery.productname={  $regex: queryParam.productname, $options: "i"}
    }

    if(queryParam.status){
        matchQuery.status={  $eq: queryParam.status}
    }
     
    if(queryParam.min && queryParam.max)
    {
        matchQuery.productprice={ $gte:queryParam.min,$lte:queryParam.max}
    }


    let product= await Product.find(matchQuery).limit(numRecords).skip(parseInt(skip)).populate('productcategory').select({productname:1})

    if(!product){
        return{"status":400,"message":"failed to fetch todo items"} ;
    }
    else{
        return{"status":200,"data":product} ;
    }
}

async function create(userParam) {
    try{
        const product = new Product(userParam);

        let savedProduct = await product.save();
        
        if(savedProduct){
            return {"status":200,"data":savedProduct}
        }
        else{
            return {"status":400,"message":"failed to save user"}
        }
    }
    catch(e){
        return{"status":400,"message":e.message} ;
    
    }
}

async function update(id,userData){
    try{    
        const product = await Product.findById(id);

        // validate
        if (!product) return { "status":404,"message":`user  not found`}
         
        // copy userParam properties to user
        Object.assign(prdouct, userData);

        let prodObj=await user.save();
        // save user
        if(!prodObj){
            return {"status":400,"message":"failed to update user details"}
        }else{
            return {"status":200,"data":prodObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function  getbyproductname(productname)
{
    try{
        let cat = await Product.findById(productname);
         
        if(!cat){
            return{"status":404,"message":"item not found"} ;
           
        }
        else{
            return{"status":200,data:cat} ; 
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }
     
}

async function removeitem(id)
{
    try{    
        let prodObj= await Product.findOneAndDelete(id)
        if(!prodObj){
            return {"status":400,"message":"failed to delete product"}
        }else{
            return {"status":200,"message":"product deleted sucessfully"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}