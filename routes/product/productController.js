const express = require('express');
const Joi = require('joi');

const router = express.Router();
const productService = require('./productService');
// routes

router.get('/', getAll);
router.get('/:id', getByID);
router.post('/', register);
router.put('/:id', update);
router.delete('/:id', removeItem);

module.exports = router;

function validateProduct(product) {
    const schema = {
        productName: Joi.string().min(3).required(),
        productPrice: Joi.number().required(),
        productCategory: Joi.string().required(),
        status: Joi.boolean()
    }
    return Joi.validate(product, schema)
}

async function getAll(req, res) {
    
    let response = await productService.getAll(req.query)
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}

async function getByID(req, res) {
    if (!req.params.id) {
        res.status(400).send({ "message": " id param is missing" });
        return;
    }
    let response = await productService.getById(req.params.id);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}



async function register(req, res, next) {
    const { error } = validateProduct(req.body);
    if (error) {
        res.status(400).send(error)
        return;
    }

    let response = await productService.create(req.body)
    if (response) {
        res.status(200).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}

async function update(req, res) {
    const { error } = validateProduct(req.body);
    if (error) {
        res.status(400).send(error)
        return;
    }
    let response = await productService.update(req.params.id, req.body);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}

async function removeItem(req, res) {
    let response = await productService.delete(req.params.id);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}