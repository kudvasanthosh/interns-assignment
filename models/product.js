const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./category");

//Product Schema
const productSchema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    status: { type: Boolean, default: false },
    productCategory: [
        { type: Schema.Types.ObjectId, ref: Category, index: true, required: true },
    ],
    timestamp: { type: Date, default: Date.now },
});

//Export Module
module.exports = mongoose.model("Product", productSchema);
