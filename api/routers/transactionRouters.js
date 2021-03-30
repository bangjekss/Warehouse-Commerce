const {
  getWarehouse,
  postTransaction,
  getTransaction,
  postPaymentBill,
  getAllTransaction,
  barangSampai,
  kirimReview,
  cancelTransaction,
} = require("../controllers/transactionControllers");

const router = require("express").Router();

router.get("/warehouse", getWarehouse);
router.get("/get-all-transaction/:clickLoad", getAllTransaction);
router.get("/:user_id", getTransaction);
router.post("/bill-of-payment/:transaction_id", postPaymentBill);
router.post("/:id", postTransaction);

router.patch("/cancel-transaction/:id", cancelTransaction);
router.patch("/barang-sampai/:id", barangSampai);
router.patch("/kirim-review/:id", kirimReview);

module.exports = router;
