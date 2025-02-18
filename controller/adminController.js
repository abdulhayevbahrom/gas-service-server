const response = require("../utils/response");
const adminDB = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AdminController {
  async getAdmins(req, res) {
    try {
      let allAdmins = await adminDB.find();
      if (!allAdmins.length) return response.notFound(res);
      response.success(res, "Adminlar topildi", allAdmins);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async createAdmin(req, res) {
    try {
      let salt = bcrypt.genSalt(+process.env.saltRounds);
      let hashedPassword = bcrypt.hashSync(req.body.password, +salt);
      req.body.password = hashedPassword;

      let newAdmin = await adminDB.create(req.body);
      if (!newAdmin) return response.error(res, "Admin qo'shilmadi");
      response.success(res, "Admin qo'shildi", newAdmin);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async deleteAdmin(req, res) {
    try {
      let deletedAdmin = await adminDB.findByIdAndDelete(req.params.id);
      if (!deletedAdmin) return response.error(res, "Admin o'chirilmadi");
      response.success(res, "Admin o'chirildi", deletedAdmin);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async updateAdmin(req, res) {
    try {
      let salt = bcrypt.genSalt(+process.env.saltRounds);
      let hashedPassword = bcrypt.hashSync(req.body.password, +salt);
      req.body.password = hashedPassword;

      let updatedAdmin = await adminDB.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedAdmin) return response.error(res, "Admin o'zgartirilmadi");
      response.success(res, "Admin o'zgartirildi", updatedAdmin);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async login(req, res) {
    try {
      let { login, password } = req.body;
      let exactAdmin = await adminDB.findOne({ login });
      if (!exactAdmin) return response.error(res, "login yoki parol xato");
      let checkPassword = bcrypt.compareSync(password, exactAdmin.password);
      if (!checkPassword) return response.error(res, "login yoki parol xato");
      let token = jwt.sign(
        {
          id: exactAdmin._id,
          login: exactAdmin.login,
          role: exactAdmin.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      response.success(res, "Login muvaffaqiyatli amalga oshirildi", {
        token,
        admin: exactAdmin,
      });
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new AdminController();
