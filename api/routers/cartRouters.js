const express = require("express");
const {
  addToCart,
  editQtyCart,
  getCartByUserId,
  updateCartQty,
  deleteCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.post("/add-to-cart/:id", addToCart);
router.put("/edit-qty/:id", editQtyCart);
router.get("/get/:user_id", getCartByUserId);
router.patch("/update-qty/:id", updateCartQty);
router.delete("/delete/:id", deleteCart);

module.exports = router;
