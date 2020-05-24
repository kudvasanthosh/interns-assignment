const express = require("express");
const Joi = require("joi");
const router = express.Router();
const productService = require("./productService");

// router methods
router.get("/", getAll);
router.get("/:productName", getByProductName);
router.post("/", addProduct);
router.put("/:productName", update);
router.delete("/:productName", removeProduct);

//export module
module.exports = router;

//validation
function validateProduct(auth) {
  const schema = {
    productName: Joi.string().min(3).required(),
    productPrice: Joi.number().required(),
    productCategory: Joi.string().required(),
    status: Joi.boolean(),
    timestamp: Joi.date(),
  };

  return Joi.validate(auth, schema);
}

async function getAll(req, res) {
  console.log(req.query);
  let response = await productService.getAll(req.query);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//post product
async function addProduct(req, res) {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  let response = await productService.create(req.body);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//get product
async function getByProductName(req, res) {
  if (!req.params.productName) {
    res.status(400).send({ message: " id param is missing" });
    return;
  }

  let response = await productService.getbyProductName(req.params.productName);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//update product
async function update(req, res) {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  let response = await productService.update(req.params.productName, req.body);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}

//delete product
async function removeProduct(req, res) {
  let response = await productService.delete(req.params.productName);
  if (response) {
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "something went wrong" });
  }
}
