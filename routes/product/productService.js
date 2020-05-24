const db = require('../../_helpers/db');

const Product=db.Product;

module.exports = {
    getAll,
    create,
    update,
    getByProductName,
    delete:removeItem
};


async function getAll(queryParam)
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

    if(queryParam.productName){
        matchQuery.productName={  $regex: queryParam.productName, $options: "i"}
    }

    if(queryParam.status){
        matchQuery.status={  $eq: queryParam.status}
    }
     
    if(queryParam.min && queryParam.max)
    {
        matchQuery.productPrice={ $gte:queryParam.min,$lte:queryParam.max}
    }


    let product= await Product.find(matchQuery).limit(numRecords).skip(parseInt(skip)).populate('productCategory').select({productName:1})

    if(!product){
        return{"status":400,"message":"failed to fetch category"} ;
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

async function update(id,productData){
    try{    
        const product = await Product.findById(id);

     
        if (!product) return { "status":404,"message":`product  not found`}
         
      
        Object.assign(product, productData);

        let productObj=await product.save();
        
        if(!productObj){
            return {"status":400,"message":"failed to update product details"}
        }else{
            return {"status":200,"data":productObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function  getByProductName(productName)
{
    try{
        let category = await Product.findById(productName);
         
        if(!category){
            return{"status":404,"message":"item not found"} ;
           
        }
        else{
            return{"status":200,data:category} ; 
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }
     
}

async function removeItem(id)
{
    try{    
        let productObj= await Product.findOneAndDelete(id)
        if(!productObj){
            return {"status":400,"message":"failed to delete product"}
        }else{
            return {"status":200,"message":"product deleted sucessfully"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}