const db = require("../../_helpers/db");
const Category = db.Category;

//Export module
module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: removeCategory,
};

//Display
async function getAll(queryParam) {
  let page = 1;
  let numRecords = 5;
  let matchQuery = {};

  if (queryParam.page) {
    page = parseInt(queryParam.page);
  }

  if (queryParam.numRecords) {
    numRecords = parseInt(queryParam.numRecords);
  }

  let skip = (page - 1) * numRecords;

  if (queryParam.categoryName) {
    matchQuery.categoryName = {
      $regex: queryParam.categoryName,
      $options: "i",
    };
  }

  if (queryParam.status) {
    matchQuery.status = { $eq: queryParam.status };
  }

  let category = await Category.find(matchQuery)
    .limit(numRecords)
    .skip(parseInt(skip));

  if (!category) {
    return { status: 400, message: "failed to fetch todo items" };
  } else {
    return { status: 200, data: category };
  }
}

//Get Id
async function getById(categoryName) {
  try {
    let cat = await Category.findById(categoryName);

    if (!cat) {
      return { status: 404, message: "item not found" };
    } else {
      return { status: 200, data: cat };
    }
  } catch (e) {
    return { status: 400, message: e.message };
  }
}

//Post Category
async function create(categoryRequest) {
  try {
    const cat = new Category(categoryRequest);
    let catObj = await cat.save();
    if (!catObj) {
      return { status: 200, message: "failed to create to do item" };
    } else {
      return { status: 200, data: catObj };
    }
  } catch (e) {
    return { status: 400, message: e.message, categoryRequest };
  }
}

//Put Category
async function update(categoryName, item) {
  try {
    const cat = await Category.findById(categoryName);

    // Validate
    if (!cat) return { status: 404, message: `todo item not found` };

    Object.assign(cat, item);

    let catObj = await cat.save();
    // Save user
    if (!catObj) {
      return { status: 400, message: "failed to update todo" };
    } else {
      return { status: 200, data: catObj };
    }
  } catch (e) {
    return { status: 400, message: e.message };
  }
}

//Delete Category
async function removeCategory(categoryName) {
  try {
    let catObj = await Category.findOneAndDelete(categoryName);
    if (!catObj) {
      return { status: 400, message: "failed to delete category" };
    } else {
      return { status: 200, message: "category deleted sucessfully" };
    }
  } catch (e) {
    return { status: 400, message: e.message };
  }
}
