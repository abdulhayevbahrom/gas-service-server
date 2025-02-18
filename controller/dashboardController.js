const response = require("../utils/response");
const reportDB = require("../models/reportModel");
const moment = require("moment");
const expensesDB = require("../models/expensesModel");

class dashboardController {
  async getDashboard(req, res) {
    try {
      let startOfMonth = moment().startOf("month").toDate();
      let endOfMonth = moment().endOf("month").toDate();

      // Ma'lumotlarni oling va `price` qiymatini yig'ing
      let monthlyReports = await reportDB.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null, // Guruhlash kerak bo'lmagani uchun `null` ishlatildi
            totalPrice: { $sum: "$price" }, // `price` qiymatlarini qo'shish
            reports: { $push: "$$ROOT" }, // Barcha hujjatlarni ro'yxatda saqlash
          },
        },
      ]);

      let expensesMonthly = await expensesDB.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null, // Guruhlash kerak bo'lmagani uchun `null` ishlatildi
            totalPrice: { $sum: "$price" }, // `price` qiymatlarini qo'shish
            reports: { $push: "$$ROOT" }, // Barcha hujjatlarni ro'yxatda saqlash
          },
        },
      ]);

      let totalExpenses = expensesMonthly[0]?.totalPrice || 0;
      let totalReports = monthlyReports[0]?.totalPrice || 0;
      let result = totalReports - totalExpenses;

      return response.success(res, "malumot topildi", {
        result,
        totalExpenses,
      });
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new dashboardController();
