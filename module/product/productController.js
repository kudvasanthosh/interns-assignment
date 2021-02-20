const express = require('express');
const Joi = require('joi');

const router = express.Router();
const productService = require('./productService');

// routes
router.get('/',getAllPro);
router.get('/:productName',getByProName);
router.post('/',addPro)
router.put('/:productName',updatePro);
router.delete('/:productName',removePro);


module.exports = router;



function validatePro(auth){
    const schema={
        productName:Joi.string().min(3).required(),
        productPrice:Joi.number().required(),
        productCategory:Joi.string().required(),
        productStatus:Joi.boolean(),
        productDate:Joi.date()
       
    }

    return Joi.validate(auth,schema) 
}


async function getAllPro(req,res){
    
    let response= await productService.getAll(req.query)
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function getByProName(req,res){
    if(!req.params.productName){
        res.status(400).send({"message":" name param is missing"});
        return;
    }
   let response= await productService.getById(req.params.productName);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function addPro(req,res){
   
    const {error} =validatePro(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
  
    let response=await productService.create(req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}

async function updatePro(req,res){
    
    const {error} =validatePro(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }

    let response=await productService.update(req.params.productName,req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }  
}

async function removePro(req,res){
    let response= await productService.delete(req.params.productName);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}


