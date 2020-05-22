const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// product schema
const ProductSchema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productCategory: { type: Schema.Types.ObjectId, ref: 'Category', index: true, required: true },
    status: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);