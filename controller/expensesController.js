const response = require("../utils/response");
const expensesDB = require("../models/expensesModel");

class expensesController {
  async getExpenses(req, res) {
    try {
      const allExpenses = await expensesDB.find();
      if (!allExpenses.length) return response.notFound(res);
      response.success(res, "Xarajatlar topildi", allExpenses);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async createExpenses(req, res) {
    try {
      const newExpenses = await expensesDB.create(req.body);
      if (!newExpenses) return response.error(res, "Xarajat qo'shilmadi");
      response.success(res, "Yangi xarajat qo'shildi", newExpenses);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async deleteExpenses(req, res) {
    try {
      const deletedExpenses = await expensesDB.findByIdAndDelete(req.params.id);
      if (!deletedExpenses) return response.error(res, "Xarajat o'chirilmadi");
      response.success(res, "Xarajat o'chirildi", deletedExpenses);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async updateExpenses(req, res) {
    try {
      const updatedExpenses = await expensesDB.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedExpenses)
        return response.error(res, "Xarajat o'zgartirilmadi");
      response.success(res, "Xarajat o'zgartirildi", updatedExpenses);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new expensesController();
