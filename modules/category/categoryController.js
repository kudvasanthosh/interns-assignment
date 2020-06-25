const express = require("express");
const Joi = require("joi");
const router = express.Router();
const categoryService = require("./categoryService");

//Router methods
router.get("/", getAll);
router.get("/:categoryName", getByCategoryName);
router.post("/", addCategory);
router.put("/:categoryName", update);
router.delete("/:categoryName", removeCategory);

//Export
module.exports = router;

//Validation
function validateCategory(category) {
  const schema = {
    categoryName: Joi.string().min(3).required(),
    status: Joi.boolean(),
    timestamp: Joi.date(),
  };
  return Joi.validate(category, schema);
}

async function getAll(req, res) {
  let response = await categoryService.getAll(req.query);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

async function getByCategoryName(req, res) {
  if (!req.params.categoryName) {
    res.status(400).send({ message: " id parameter is missing" });
    return;
  }
  let response = await categoryService.getById(req.params.categoryName);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//Post Category
async function addCategory(req, res) {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  let response = await categoryService.create(req.body);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//Put Category
async function update(req, res) {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  let response = await categoryService.update(
    req.params.categoryName,
    req.body
  );
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//Delete Category
async function removeCategory(req, res) {
  let response = await categoryService.delete(req.params.categoryName);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}
