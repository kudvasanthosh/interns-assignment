const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Category Schema
const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  status: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now, required: true },
});

//Export Module
module.exports = mongoose.model("Category", categorySchema);
