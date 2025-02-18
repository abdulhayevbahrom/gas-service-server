const router = require("express").Router();

const adminValidation = require("../validation/adminValidation");
const adminController = require("../controller/adminController");

const workersValidation = require("../validation/workersValidation");
const workersController = require("../controller/workersController");

const productController = require("../controller/productContoller");
const productValidation = require("../validation/productValidation");

const expensesController = require("../controller/expensesController");
const expensesValidation = require("../validation/expensesValidation");

const reportController = require("../controller/reportController");

const dashboardController = require("../controller/dashboardController");

// ================== ADMIN ROUTER =============
router.get("/admin/all", adminController.getAdmins);
router.post("/admin/create", adminValidation, adminController.createAdmin);
router.delete("/admin/delete/:id", adminController.deleteAdmin);
router.put("/admin/update/:id", adminValidation, adminController.updateAdmin);
router.post("/admin/login", adminController.login);

// ================== WORKERS ROUTER =============
router.get("/workers/all", workersController.getWorkers);
router.post(
  "/workers/create",
  workersValidation,
  workersController.createWorker
);
router.delete("/workers/delete/:id", workersController.deleteWorker);
router.put(
  "/workers/update/:id",
  workersValidation,
  workersController.updateWorker
);

// ================== PRODUCT ROUTER =============
router.get("/product/all", productController.getProducts);
router.post(
  "/product/create",
  productValidation,
  productController.createProduct
);
router.delete("/product/delete/:id", productController.deleteProduct);
router.put(
  "/product/update/:id",
  productValidation,
  productController.updateProduct
);

// ================== EXPENSES ROUTER =============
router.get("/expenses/all", expensesController.getExpenses);
router.post(
  "/expenses/create",
  expensesValidation,
  expensesController.createExpenses
);
router.delete("/expenses/delete/:id", expensesController.deleteExpenses);
router.put(
  "/expenses/update/:id",
  expensesValidation,
  expensesController.updateExpenses
);

// REPORT ROUTER
router.get("/report/all", reportController.getReports);
router.post("/report/create", reportController.createReport);

// dashboard
router.get("/dashboard", dashboardController.getDashboard);

module.exports = router;
