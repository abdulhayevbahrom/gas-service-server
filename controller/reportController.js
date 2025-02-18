const reportDB = require("../models/reportModel");
const response = require("../utils/response");
const productsDB = require("../models/productsModel");

class reportController {
  async getReports(req, res) {
    try {
      let allReports = await reportDB.find();
      if (!allReports.length) return response.notFound(res);
      response.success(res, "Xisobotlar topildi", allReports);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async createReport(req, res) {
    try {
      let { zapchast, balon } = req.body;

      // Balon ma'lumotlarini olish
      let balonInfo = await productsDB
        .findById(balon)
        .lean()
        .select("-__v -quantity");

      if (!balonInfo) return response.notFound(res);
      if (balonInfo) {
        await productsDB.updateOne({ _id: balon }, { $inc: { quantity: -1 } });
      }

      // Zapchast ma'lumotlarini parallel ravishda olish
      let zapchastData = await Promise.all(
        zapchast.map(async (id) => {
          let zapchastInfo = await productsDB
            .findById(id)
            .lean()
            .select("-__v -quantity");

          if (zapchastInfo) {
            await productsDB.updateOne({ _id: id }, { $inc: { quantity: -1 } });
            return zapchastInfo;
          }
          return null;
        })
      );

      // Natijalarni yig'ish
      let data = {
        balon: balonInfo,
        zapchast: zapchastData.filter(Boolean),
        price: +req.body.price,
        avto_number: req.body.avto_number,
      };

      let newReport = await reportDB.create(data);
      if (!newReport) return response.error(res, "Xisobot yaratilmadi");
      response.success(res, "Xisobot yaratildi", newReport);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new reportController();
