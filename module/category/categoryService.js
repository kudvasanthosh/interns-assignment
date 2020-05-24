const db=require('../../_helpers/db');
const Category= db.Category;

module.exports={
  getAll,
  getById,
  create,
  update,
  delete:removeCategory
}


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

    if(queryParam.categoryname){
        matchQuery.categoryname={  $regex: queryParam.categoryname, $options: "i"}
    }

    if(queryParam.categorystatus){
        matchQuery.categorystatus={  $eq: queryParam.categorystatus}
    }

    

    let category= await Category.find(matchQuery).limit(numRecords).skip(parseInt(skip))

    if(!category){
        return{"status":400,"message":"failed to fetch  items"} ;
    }
    else{
        return{"status":200,"data":category} ;
    }
}

async function getById(categoryName){
    try{
        let catId = await Category.findById(categoryName);
         
        if(!catId){
            return{"status":404,"message":"item not found"} ;
           
        }
        else{
            return{"status":200,data:catId} ; 
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }
  
}

async function create(categoryRequest){
    try{
        const catReq= new Category(categoryRequest);
        let catObj=await catReq.save();
        if(!catObj){
            return { "status":200, "message":"failed to create  item"}     
        }
        else{
            return { "status":200, "data":catObj}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message,categoryRequest} ;
    }     
}

async function update(categoryName,item){
    try{    
        const catId = await Category.findById(categoryName);

        // validate
        if (!catId) return { "status":404,"message":`Item not found`}

        // copy courseParam properties to course
        Object.assign(catId, item);

        let catObj=await catId.save();
        // save user
        if(!catObj){
            return {"status":400,"message":"failed to update item"}
        }else{
            return {"status":200,"data":catObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function removeCategory(categoryName){
    try{    
        let catObj= await Category.findByIdAndRemove(categoryName);
        if(!catObj){
            return {"status":400,"message":"failed to remove category"}
        }else{
            return {"status":200,"message":"category sucessfully removed"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}

