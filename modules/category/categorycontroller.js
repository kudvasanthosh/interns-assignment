const express =require('express');
const Joi = require('joi');
const router= express.Router();
const categoryservice=require('./categoryservice');
//const utils=require('../../_helpers/utils');

router.get('/',getAll);
router.get('/:categoryname',getByCategoryname);
router.post('/',addCategory)
router.put('/:categoryname',update);
router.delete('/:categoryname',removecategory);


module.exports=router;


function validatecategory(category){
    const schema={
        categoryname :Joi.string().min(3).required(),
        status:Joi.boolean(),
        createdAt:Joi.date()
    }

    return Joi.validate(category,schema)
   
}

async function getAll(req,res){
    //let { sub }=utils.decodeHeader(req.headers.authorization);
    let response=await categoryservice.getAll(req.query)
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function getByCategoryname(req,res){
    if(!req.params.categoryname){
        res.status(400).send({"message":" id param is missing"});
        return;
    }
   let response= await categoryservice.getById(req.params.categoryname);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function addCategory(req,res){
    //let { sub }=utils.decodeHeader(req.headers.authorization);
    const {error} =validatecategory(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    //req.body.userId=sub;
    let response=await categoryservice.create(req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function update(req,res){
    //let { sub }=utils.decodeHeader(req.headers.authorization);
    const {error} =validatecategory(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    //req.body.userId=sub;
    let response=await categoryservice.update(req.params.categoryname,req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }  
}

async function removecategory(req,res){
    let response= await categoryservice.delete(req.params.categoryname);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}


