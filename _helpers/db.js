const mongoose = require("mongoose");

//Connection
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Export collections
module.exports = {
  Category: require("../models/category"),
  Product: require("../models/product"),
};
