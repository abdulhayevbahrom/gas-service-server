const WorkersDB = require("../models/workersModel");
const response = require("../utils/response");

class workersController {
  async getWorkers(req, res) {
    try {
      let allWorkers = await WorkersDB.find();
      if (!allWorkers.length) return response.notFound(res);
      response.success(res, "Ishchilar topildi", allWorkers);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async createWorker(req, res) {
    try {
      let newWorker = await WorkersDB.create(req.body);
      if (!newWorker) return response.error(res, "Ishchi qo'shilmadi");
      response.success(res, "Ishchi qo'shildi", newWorker);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  // delete worker
  async deleteWorker(req, res) {
    try {
      let deletedWorker = await WorkersDB.findByIdAndDelete(req.params.id);
      if (!deletedWorker) return response.error(res, "Ishchi o'chirilmadi");
      response.success(res, "Ishchi o'chirildi", deletedWorker);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  // update worker
  async updateWorker(req, res) {
    try {
      let updatedWorker = await WorkersDB.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedWorker)
        return response.error(res, "Ishchi o'zgartirilmadi", updatedWorker);
      response.success(res, "Ishchi o'zgartirildi", updatedWorker);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new workersController();
