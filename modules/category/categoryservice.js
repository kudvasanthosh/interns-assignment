const db=require('../../_helpers/db');
const Category= db.Category;


module.exports={
  getAll,
  getById,
  create,
  update,
  delete:removecategory
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

    if(queryParam.status){
        matchQuery.status={  $eq: queryParam.status}
    }

    let category= await Category.find(matchQuery).limit(numRecords).skip(parseInt(skip))

    if(!category){
        return{"status":400,"message":"failed to fetch todo items"} ;
    }
    else{
        return{"status":200,"data":category} ;
    }
}

async function getById(categoryname){
    try{
        let cat = await Category.findById(categoryname);
         
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

async function create(categoryrequest){
    try{
        const cat= new Category(categoryrequest);
        let catObj=await cat.save();
        if(!catObj){
            return { "status":200, "message":"failed to create to do item"}     
        }
        else{
            return { "status":200, "data":catObj}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message,categoryrequest} ;
    }     
}

async function update(categoryname,item){
    try{    
        const cat = await Category.findById(categoryname);

        // validate
        if (!cat) return { "status":404,"message":`todo item not found`}

        Object.assign(cat, item);

        let catObj=await cat.save();
        // save user
        if(!catObj){
            return {"status":400,"message":"failed to update todo"}
        }else{
            return {"status":200,"data":catObj}  
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }   
}

async function removecategory(categoryname){
    try{    
        let catObj= await Category.findOneAndDelete(categoryname)
        if(!catObj){
            return {"status":400,"message":"Failed to delete category"}
        }else{
            return {"status":200,"message":"Category deleted sucessfully"}
        }
    } 
    catch(e){
        return{"status":400,"message":e.message} ;
    }     
}

