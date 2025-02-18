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
  async deleteProduct(req, res) {
    try {
      let deletedProduct = await productDB.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return response.error(res, "Malumot o'chirilmadi");
      response.success(res, "Malumot o'chirildi", deletedProduct);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async updateProduct(req, res) {
    try {
      let updatedProduct = await productDB.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct)
        return response.error(res, "Mahsulot o'zgartirilmadi", updatedProduct);
      response.success(res, "Mahsulot o'zgartirildi", updatedProduct);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new productController();
