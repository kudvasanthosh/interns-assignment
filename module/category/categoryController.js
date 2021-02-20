const express =require('express');
const Joi = require('joi');
const router= express.Router();
const categoryService=require('./categoryService');


router.get('/',getAllCat);
router.get('/:categoryName',getByCatName);
router.post('/',addCat)
router.put('/:categoryName',updateCat);
router.delete('/:categoryName',removeCat);

module.exports=router;

function validateCat(category){
    const schema={
        categoryName:Joi.string().min(3).required(),
        categoryStatus:Joi.boolean(),
        categoryDate:Joi.date()
    }

    return Joi.validate(category,schema)
   
}


async function getAllCat(req,res){
    
    let response=await categoryService.getAll(req.query)
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function getByCatName(req,res){
    if(!req.params.categoryName){
        res.status(400).send({"message":" name param is missing"});
        return;
    }
   let response= await categoryService.getById(req.params.categoryName);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function addCat(req,res){
   
    const {error} =validateCat(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
  
    let response=await categoryService.create(req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function updateCat(req,res){
    
    const {error} =validateCat(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }

    let response=await categoryService.update(req.params.categoryName,req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }  
}

async function removeCat(req,res){
    let response= await categoryService.delete(req.params.categoryName);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}


