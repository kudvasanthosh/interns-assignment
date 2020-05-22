const mongoose = require('mongoose');
// connecting to db
mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
    Product: require('../models/product'),
    Category: require('../models/category'),
}