const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// category schema
const CategorySchema = new Schema({
    categoryName: { type: String, required: true },
    status: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);