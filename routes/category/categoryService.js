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

    if(queryParam.categoryName){
        matchQuery.categoryName={  $regex: queryParam.categoryName, $options: "i"}
    }

    if(queryParam.status){
        matchQuery.status={  $eq: queryParam.status}
    }

    let category= await Category.find(matchQuery).limit(numRecords).skip(parseInt(skip))

    if(!category){
        return{"status":400,"message":"failed to fetch category"} ;
    }
    else{
        return{"status":200,"data":category} ;
    }
}

async function getById(categoryName){
    try{
        let category = await Category.findById(categoryName);
         
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

async function create(categoryRequest){
    try{
        const category= new Category(categoryRequest);
        let categoryObj=await category.save();
        if(!categoryObj){
            return { "status":200, "message":"failed to create to do item"}     
        }
        else{
            return { "status":200, "data":categoryObj}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message,categoryRequest} ;
    }     
}

async function update(categoryName,item){
    try{    
        const category = await Category.findById(categoryName);

        
        if (!category) return { "status":404,"message":`category not found`}

        Object.assign(category, item);

        let categoryObj=await category.save();
       
        if(!categoryObj){
            return {"status":400,"message":"failed to update category"}
        }else{
            return {"status":200,"data":categoryObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function removeCategory(categoryName){
    try{    
        let categoryObj= await Category.findOneAndDelete(categoryName)
        if(!categoryObj){
            return {"status":400,"message":"failed to delete category"}
        }else{
            return {"status":200,"message":"category deleted sucessfully"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}

