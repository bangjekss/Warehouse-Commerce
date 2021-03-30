const {
	addProduct,
	getProducts,
	getCategories,
	getProductById,
} = require("../controllers/productControllers");

const router = require("express").Router();

router.post("/", addProduct);
router.get("/search", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

module.exports = router;
