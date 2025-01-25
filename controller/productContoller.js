const productDB = require("../models/productsModel");
const response = require("../utils/response");

class productController {
  async getProducts(req, res) {
    try {
      const allProducts = await productDB.find();
      if (!allProducts.length) return response.notFound(res);
      response.success(res, "Mahsulotlar topildi", allProducts);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  // create
  async createProduct(req, res) {
    try {
      const newProduct = await productDB.create(req.body);
      if (!newProduct) return response.error(res, "Mahsulot yaratilmadi");
      response.success(res, "Yangi mahsulot yaratildi", newProduct);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new productController();
