const db = require('../../helper/db');
const Categorydb = db.Category;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: removeItem
}

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

    if (queryParam.categoryItem) {
        matchQuery.categoryItem = { $regex: queryParam.categoryItem, $options: "i" }
    }

    if (queryParam.status) {
        matchQuery.status = { $eq: queryParam.status }
    }

    let categoryItems = await Categorydb.find(matchQuery).limit(numRecords).skip(parseInt(skip))

    if (!categoryItems) {
        return { "status": 400, "message": "failed to fetch category items" };
    } else {
        return { "status": 200, "data": categoryItems };
    }
}


async function getById(id) {
    try {
        let category = await Categorydb.findById(id);

        if (!category) {
            return { "status": 404, "message": "item not found" };

        } else {
            return { "status": 200, data: category };
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}

async function create(categoryItem) {
    try {
        const category = new Categorydb(categoryItem);
        let categoryObj = await category.save();
        if (!categoryObj) {
            return { "status": 200, "message": "failed to create category item" }
        } else {
            return { "status": 200, "data": categoryObj }
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}

async function update(id, categoryItem) {
    try {
        const category = await Categorydb.findById(id);

        // validate
        if (!category) return { "status": 404, "message": `category item not found` }

        // copy courseParam properties to course
        Object.assign(category, categoryItem);

        let categoryObj = await category.save();
        // save user
        if (!categoryObj) {
            return { "status": 400, "message": "failed to update category" }
        } else {
            return { "status": 200, "data": categoryObj }
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}

// remove the category item
async function removeItem(id) {
    try {
        let categoryObj = await Categorydb.findByIdAndRemove(id);
        if (!categoryObj) {
            return { "status": 400, "message": "failed to delete category" }
        } else {
            return { "status": 200, "message": "category deleted sucessfully" }
        }
    } catch (e) {
        return { "status": 400, "message": e.message };
    }
}