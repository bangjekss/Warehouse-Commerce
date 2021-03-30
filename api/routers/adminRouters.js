const express = require("express");
const router = express.Router();
const {
	getWarehouse,
	getProductsByWarehouse,
	addProductByWarehouse,
	editProduct,
	deleteProduct,
	stockMonitoring,
	sentPackage,
	approveBukti,
	rejectBukti,
	kirimBarang,
} = require("../controllers/adminControllers");
const { getDashboard } = require("../controllers/adminControllers");

router.get("/fetchWarehouse", getWarehouse);
router.get("/get-by-warehouse/:id", getProductsByWarehouse);
router.post("/add-product/:id", addProductByWarehouse);
router.get("/dashboard", getDashboard);
router.patch("/edit-product/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/monitoring", stockMonitoring);
router.get("/sent-package", sentPackage);
router.patch("/approve-bukti/:transactionId", approveBukti);
router.patch("/reject-bukti/:transactionId", rejectBukti);
router.patch("/kirim-barang/:transactionId", kirimBarang);

module.exports = router;
