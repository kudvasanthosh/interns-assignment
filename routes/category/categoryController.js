const express = require('express');
const Joi = require('joi');
const router = express.Router();
const categoryService = require('./categoryService');


router.get('/', getAll);
router.get('/:id', getByID);
router.post('/', addCategory)
router.put('/:id', update);
router.delete('/:id', removeItem);

module.exports = router;

function validateCategoryItem(categorydetails) {
    const schema = {
        categoryName: Joi.string().min(3).required(),
        status: Joi.boolean(),
        createdDate: Joi.date()
    }

    return Joi.validate(categorydetails, schema)

}

async function getAll(req, res) {
    
    let response = await categoryService.getAll(req.query)
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
    let response = await categoryService.getById(req.params.id);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}

async function addCategory(req, res) {
    
    const { error } = validateCategoryItem(req.body);
    if (error) {
        res.status(400).send(error)
        return;
    }
    
    let response = await categoryService.create(req.body);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}

async function update(req, res) {
    
    const { error } = validateCategoryItem(req.body);
    if (error) {
        res.status(400).send(error)
        return;
    }
    let response = await categoryService.update(req.params.id, req.body);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}

async function removeItem(req, res) {
    let response = await categoryService.delete(req.params.id);
    if (response) {
        res.status(response.status).send(response)
    } else {
        res.status(400).send({ "message": "something went wrong" })
    }
}
