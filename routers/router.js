const { Router } = require("express");
const router = Router();
const workersValidation = require("../validation/workersValidation");

const workersController = require("../controller/workersController");

// workers router
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

// PRODUCT ROUTER
const productController = require("../controller/productContoller");

router.get("/product/all", productController.getProducts);
router.post("/product/create", productController.createProduct);

// product router
module.exports = router;
