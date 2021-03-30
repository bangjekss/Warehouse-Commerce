const {
	cart,
	user,
	product,
	productImage,
	warehouse,
	inventory,
	category,
} = require("../models");

const getCartByUserId = async (req, res, next) => {
	const { user_id } = req.params;
	try {
		const getData = await cart.findAll({
			where: {
				user_id,
			},
			include: [
				{
					model: product,
					include: [
						{ model: productImage },
						{ model: inventory },
						{ model: category },
					],
					required: true,
				},
			],
		});

		const response = getData.map((val) => {
			let stock = 0;

			val.product.inventories.forEach((val) => {
				return (stock += val.stock);
			});

			return {
				id: val.id,
				product_id: val.product.id,
				name: val.product.name,
				weight: val.product.weight,
				price: val.product.price,
				category: val.product.category.category,
				description: val.product.description,
				qty: val.qty,
				stock,
				imagepath: val.product.product_images[0].imagepath,
			};
		});

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const updateCartQty = async (req, res, next) => {
	const { id } = req.params;
	const { qty } = req.body;

	try {
		await cart.update({ qty }, { where: { id } });

		res.status(200).send({ message: "updated" });
	} catch (err) {
		next(err);
	}
};

const deleteCart = async (req, res, next) => {
	const { id } = req.params;

	try {
		await cart.destroy({ where: { id } });

		res.status(200).send({ message: "deleted" });
	} catch (err) {
		next(err);
	}
};

const addToCart = async (req, res, next) => {
	try {
		const addCart = await cart.create({
			qty: req.body.qty,
			product_id: req.body.productId,
			user_id: req.params.id,
		});
		res.status(200).send({ message: "Add to Cart Success", id: addCart.id });
	} catch (err) {
		next(err);
	}
};

const editQtyCart = async (req, res, next) => {
	try {
		const qty = await cart.update(
			{
				qty: req.body.qty,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).send({ message: "Updated", id: qty.id });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addToCart,
	getCartByUserId,
	editQtyCart,
	deleteCart,
	updateCartQty,
};
