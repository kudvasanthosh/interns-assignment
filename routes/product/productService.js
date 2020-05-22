const jwt = require('jsonwebtoken');
const db = require('../../helper/db');
const Productdb = db.Product;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: removeItem
        
};



async function getAll(queryParam, userId) {
    let page = 1;
    let numRecords = 5;
    let matchQuery = {};

    if (queryParam.page) {
        page = parseInt(queryParam.page)
    }

    if (queryParam.numRecords) {
        numRecords = parseInt(queryParam.numRecords)
    }

    let skip = (page - 1) * numRecords;

    if (queryParam.productItem) {
        matchQuery.productItem = { $regex: queryParam.productItem, $options: "i" }
    }

    if (queryParam.status) {
        matchQuery.status = { $eq: queryParam.status }
    }

   

    let productItems = await Productdb.find(matchQuery).limit(numRecords).skip(parseInt(skip))

    if (!productItems) {
        return { "status": 400, "message": "failed to fetch product items" };
    } else {
        return { "status": 200, "data": productItems };
    }
}

async function getById(id) {
    try {
        let product = await Productdb.findById(id);

        if (!product) {
            return { "status": 404, "message": "item not found" };

        } else {
            return { "status": 200, data: product };
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}
async function create(productParam) {
    // validate
    if (await Productdb.findOne({ productName: productParam.productName })) {
        return { "status": 400, "message": `Productname  ${productParam.productName} is already taken` }
    }

    const product = new Productdb(productParam);
    let savedProduct = await product.save();
    if (savedProduct) {
        return { "status": 200, "data": savedProduct }
    } else {
        return { "status": 400, "message": "failed to save product" }
    }

}


async function update(id, productData) {
    try {
        const product = await Productdb.findById(id);

        // validate
        if (!product) return { "status": 404, "message": `product  not found` }

        // copy productParam properties to product
        Object.assign(product, productData);

        let productObj = await product.save();
        // save product
        if (!productObj) {
            return { "status": 400, "message": "failed to update product details" }
        } else {
            return { "status": 200, "data": productObj }
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}

async function removeItem(id) {
    try {
        let productObj = await Productdb.findByIdAndRemove(id);
        if (!productObj) {
            return { "status": 400, "message": "failed to delete product" }
        } else {
            return { "status": 200, "message": "product deleted sucessfully" }
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}