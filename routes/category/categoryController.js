const express =require('express');
const Joi = require('joi');
const router= express.Router();
const categoryService=require('./categoryService');
//const utils=require('../../_helpers/utils');

router.get('/',getAll);
router.get('/:categoryName',getByCategoryName);
router.post('/',addCategory)
router.put('/:categoryName',update);
router.delete('/:categoryName',removeCategory);


module.exports=router;


function validateCategory(category){
    const schema={
        categoryName :Joi.string().min(3).required(),
        status:Joi.boolean(),
        createdAt:Joi.date()
    }

    return Joi.validate(category,schema)
   
}

async function getAll(req,res){
    //let { sub }=utils.decodeHeader(req.headers.authorization);
    let response=await categoryService.getAll(req.query)
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function getByCategoryName(req,res){
    if(!req.params.categoryName){
        res.status(400).send({"message":" id param is missing"});
        return;
    }
   let response= await categoryService.getById(req.params.categoryName);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function addCategory(req,res){
    //let { sub }=utils.decodeHeader(req.headers.authorization);
    const {error} =validateCategory(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    //req.body.userId=sub;
    let response=await categoryService.create(req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function update(req,res){
    //let { sub }=utils.decodeHeader(req.headers.authorization);
    const {error} =validateCategory(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    //req.body.userId=sub;
    let response=await categoryService.update(req.params.categoryName,req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }  
}

async function removeCategory(req,res){
    let response= await categoryService.delete(req.params.categoryName);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}


