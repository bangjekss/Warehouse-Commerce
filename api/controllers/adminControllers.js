const { Op } = require("sequelize");
const sequelize = require("../database");
const fs = require("fs");
const pify = require("pify");
const { uploader } = require("../handlers");

const {
	transaction,
	user,
	monthly_report,
	product,
	warehouse,
	inventory,
	productImage,
	category,
} = require("../models");

const getWarehouse = async (req, res, next) => {
	try {
		const getWarehouse = await warehouse.findAll();
		const response = [];
		getWarehouse.forEach((value) => {
			response.push({ value: value.id, label: value.warehouse });
		});
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const getProductsByWarehouse = async (req, res, next) => {
	try {
		let query = {
			raw: true,
		};
		if (req.query.warehouse)
			query.where = {
				...query.where,
				warehouse_id: parseInt(req.query.warehouse.id),
			};
		query = {
			...query,
			attributes: [
				"id",
				"warehouse",
				"products.inventory.product_id",
				"products.name",
				"products.price",
				"products.weight",
				"products.description",
				"products.inventory.stock",
				"products.inventory.booked_stock",
				"products.category.category",
				// "image",
			],
			include: [
				{
					model: product,
					attributes: [],
					include: [
						// { model: warehouse, attributes: [] },
						// { model: inventory, attributes: [] },
						{ model: category, attributes: [] },
					],
					require: true,
				},
			],
			where: { id: req.params.id },
		};
		const getWarehouse = await warehouse.findAll(query);
		const productImg = await productImage.findAll();
		const Warehouse1 = await warehouse.findOne({
			attributes: ["warehouse"],
			where: (id = 1),
		});
		const Warehouse2 = await warehouse.findOne({
			attributes: ["warehouse"],
			where: (id = 2),
		});
		const Warehouse3 = await warehouse.findOne({
			attributes: ["warehouse"],
			where: (id = 3),
		});
		const getProductImg = getWarehouse.map((value) => {
			return {
				...value,
				operationalStock: value.stock + value.booked_stock,
				image: productImg.filter((item) => {
					return item.dataValues.product_id === value.product_id;
				}),
			};
		});
		const response = {
			Warehouse1: Warehouse1.warehouse,
			Warehouse2: Warehouse2.warehouse,
			Warehouse3: Warehouse3.warehouse,
			warehouse: getProductImg,
		};

		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const addProductByWarehouse = async (req, res, next) => {
	try {
		const path = "/products";
		const upload = pify(uploader(path, "PRD").fields([{ name: "image" }]));

		upload(req, res, async (err) => {
			const { image } = req.files;
			const {
				name,
				price,
				category_id,
				description,
				weight,
				stock,
				booked_stock,
			} = JSON.parse(req.body.data);
			const id = req.params.id;
			const imagepath = image ? `${path}/${image[0].filename}` : null;

			const newProduct = await product.create({
				name,
				price,
				category_id,
				description,
				weight,
			});
			await inventory.create({
				stock,
				booked_stock,
				product_id: newProduct.id,
				warehouse_id: id,
				operational_stock: stock + booked_stock,
			});
			const newImg = await productImage.create({
				imagepath: imagepath,
				product_id: newProduct.id,
			});

			if (newImg) {
				return res.status(200).send(`Product Added`);
			} else {
				fs.unlinkSync(`public${imagepath}`);
				return res.status(500).send(err);
			}
		});
	} catch (err) {
		next(err);
	}
};

const editProduct = async (req, res, next) => {
	try {
		const path = "/products";
		const upload = pify(uploader(path, "PRD").fields([{ name: "image" }]));
		const id = req.params.id;

		const pro = await productImage.findOne({
			where: {
				product_id: id,
			},
		});
		const oldImagepath = pro.dataValues.imagepath;

		upload(req, res, async (err) => {
			const { image } = req.files;
			const {
				name,
				price,
				category_id,
				description,
				stock,
				booked_stock,
			} = JSON.parse(req.body.data);
			const imagepath = image ? `${path}/${image[0].filename}` : oldImagepath;

			await product.update(
				{
					name,
					price,
					category_id,
					description,
				},
				{
					where: {
						id: id,
					},
				}
			);
			await inventory.update(
				{
					stock,
					booked_stock,
				},
				{
					where: {
						product_id: id,
					},
				}
			);
			const newImg = await productImage.update(
				{
					imagepath: imagepath,
				},
				{
					where: {
						product_id: id,
					},
				}
			);

			if (newImg) {
				if (image && oldImagepath !== null) {
					fs.unlinkSync(`public${oldImagepath}`);
					return res.status(500).send(err);
				}
			} else {
				fs.unlinkSync(`public${imagepath}`);
			}
		});
		return res.status(200).send(`Edited`);
	} catch (err) {
		next(err);
	}
};

const deleteProduct = async (req, res, next) => {
	try {
		const id = req.params.id;

		const pro = await productImage.findOne({
			where: {
				product_id: id,
			},
		});
		const oldImagepath = pro.dataValues.imagepath;

		if (oldImagepath) {
			fs.unlinkSync(`public${oldImagepath}`);
			await product.destroy({
				where: {
					id: id,
				},
			});
			await productImage.destroy({
				where: {
					product_id: id,
				},
			});
			await inventory.destroy({
				where: {
					product_id: id,
				},
			});
		}
		return res.status(200).send("Deleted Product");
	} catch (err) {
		next(err);
	}
};

const getDashboard = async (req, res, next) => {
	try {
		const totalOrder = await transaction.count("id", {
			where: { order_status_id: 5 },
		});

		const totalProfit = await transaction.sum("amount", {
			where: { order_status_id: 5 },
		});

		const totalClient = await user.count();

		const dailyProfit = await transaction.sum("amount", {
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 1),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const weeklyProfit = await transaction.sum("amount", {
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 7),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const monthlyProfit = await transaction.sum("amount", {
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn(
							"subdate",
							sequelize.fn("now"),
							sequelize.fn("dayofmonth", sequelize.fn("now"))
						),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const [[rangeMonthly]] = await sequelize.query(`
			SELECT
				DAYNAME(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_dayname,
    		DAYOFMONTH(SUBDATE(NOW(), DAYOFMONTH(now())-1)) AS from_date,
    		EXTRACT(MONTH FROM SUBDATE(NOW(), DAYOFMONTH(NOW())-1)) AS from_month,
				MONTHNAME(SUBDATE(NOW(), DAYOFMONTH(NOW())-1)) AS from_monthname,
    		YEAR(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_year,
    		DATE_FORMAT(SUBDATE(NOW(), DAYOFMONTH(NOW()) -1), '%M, %D %Y') AS from_date_format,
    		SUBDATE(NOW(), DAYOFMONTH(NOW())-1) AS from_spesific_date,
    		DAYNAME(NOW()) AS to_dayname,
				DAYOFMONTH(NOW()) AS to_date,
				EXTRACT(MONTH FROM NOW()) AS to_month,
    		MONTHNAME(NOW()) AS to_monthname,
    		YEAR(NOW()) AS to_year,
				DATE_FORMAT(NOW(), '%M, %D %Y') AS to_date_format,
    		NOW() AS to_spesific_date 
			FROM transaction WHERE id=1;
		`);

		const [[rangeWeekly]] = await sequelize.query(`
			SELECT
				DAYNAME(SUBDATE(NOW(), 7)) AS from_dayname,
    		DAYOFMONTH(SUBDATE(NOW(), 7)) AS from_date,
       	MONTHNAME(SUBDATE(NOW(), 1)) AS from_monthname,
    		EXTRACT(MONTH FROM SUBDATE(created_at, 7)) AS from_month,
        YEAR(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_year,
    		DATE_FORMAT(SUBDATE(NOW(), 7), '%M, %D %Y') AS from_date_format,
    		SUBDATE(NOW(), 7) AS from_spesific_date,
    		DAYNAME(NOW()) AS to_dayname,
				DAYOFMONTH(NOW()) AS to_date,
				EXTRACT(MONTH FROM NOW()) AS to_month,
				MONTHNAME(NOW()) AS to_monthname,
				YEAR(NOW()) AS to_year,
				DATE_FORMAT(NOW(), '%M, %D %Y') AS to_date_format,
    		NOW() AS to_spesific_date 
			FROM transaction WHERE id=1;
		`);

		const [[rangeDaily]] = await sequelize.query(`
			SELECT
				DAYNAME(SUBDATE(NOW(), 1)) AS from_dayname,
    		DAYOFMONTH(SUBDATE(NOW(), 1)) AS from_date,
    		EXTRACT(MONTH FROM SUBDATE(created_at, 1)) AS from_month,
				MONTHNAME(SUBDATE(NOW(), 1)) AS from_monthname,
				YEAR(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_year,
    		DATE_FORMAT(SUBDATE(NOW(), 1), '%M, %D %Y') AS from_date_format,
    		SUBDATE(NOW(), 1) AS from_spesific_date,
    		DAYNAME(NOW()) AS to_dayname,
				DAYOFMONTH(NOW()) AS to_date,
				MONTHNAME(NOW()) AS to_monthname,
				EXTRACT(MONTH FROM NOW()) AS to_month,
				YEAR(NOW()) AS to_year,
				DATE_FORMAT(NOW(), '%M, %D %Y') AS to_date_format,
   		 	NOW() AS to_spesific_date 
			FROM transaction WHERE id=1;
		`);

		const monthlyTransaction = await transaction.findAll({
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn(
							"subdate",
							sequelize.fn("now"),
							sequelize.fn("dayofmonth", sequelize.fn("now"))
						),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const weeklyTransaction = await transaction.findAll({
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 7),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const dailyTransaction = await transaction.findAll({
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 1),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const monthlyReport = {
			range: rangeMonthly ? rangeMonthly : null,
			profit: parseInt(monthlyProfit),
			transaction: monthlyTransaction,
		};
		const weeklyReport = {
			range: rangeWeekly ? rangeWeekly : null,
			profit: parseInt(weeklyProfit),
			transaction: weeklyTransaction,
		};
		const dailyReport = {
			range: rangeDaily ? rangeDaily : null,
			profit: parseInt(dailyProfit),
			transaction: dailyTransaction,
		};

		const getMonthlyReportGroup = await monthly_report.findAll({
			group: "year",
		});

		const getMonthlyReport = await monthly_report.findAll();

		const anualReport = [];

		getMonthlyReportGroup.forEach((group, index) => {
			return anualReport.push({
				id: group.year,
				data: getMonthlyReport.map((month, index) => {
					return {
						x: month.month,
						y: month.total_order,
						profit: month.profit,
					};
				}),
			});
		});

		const response = {
			totalOrder,
			totalProfit,
			totalClient,
			monthlyReport,
			weeklyReport,
			dailyReport,
			anualReport,
		};

		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const stockMonitoring = async (req, res, next) => {
	try {
		const getProducts = await product.findAll({
			include: [{ model: inventory }, { model: category }],
		});
		let getIndex;
		getProducts.forEach((value) => {
			value.inventories.forEach((item) => {
				if (item.stock === 0) {
					getIndex = value.id;
				}
			});
		});
		await product.update(
			{ is_available_all: 0 },
			{
				where: {
					id: getIndex,
				},
			}
		);
		const response = await product.findAll({
			include: [{ model: inventory }, { model: category }],
			order: [
				[{ model: inventory }, "warehouse_id", "ASC"],
				["is_available_all", "ASC"],
			],
		});
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const sentPackage = async (req, res, next) => {
	try {
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const approveBukti = async (req, res, next) => {
	const { transactionId } = req.params;
	try {
		await transaction.update(
			{
				order_status_id: 4,
			},
			{ where: { id: transactionId } }
		);

		res.status(200).send({ message: "Updated" });
	} catch (err) {
		next(err);
	}
};

const rejectBukti = async (req, res, next) => {
	const { transactionId } = req.params;
	try {
		await transaction.update(
			{
				order_status_id: 3,
			},
			{ where: { id: transactionId } }
		);

		res.status(200).send({ message: "Updated" });
	} catch (err) {
		next(err);
	}
};

const kirimBarang = async (req, res, next) => {
	const { transactionId } = req.params;

	try {
		await transaction.update(
			{
				order_status_id: 5,
			},
			{ where: { id: transactionId } }
		);

		req.body.map((val) => {
			const { stock_gateway, product_id } = val;

			stock_gateway.map(async (val) => {
				const { warehouse_id, qty } = val;

				const getData = await inventory.findOne({
					where: {
						[Op.and]: [{ product_id }, { warehouse_id }],
					},
				});

				const bookedStock = getData.booked_stock;

				await inventory.update(
					{
						booked_stock: bookedStock - qty,
					},
					{
						where: {
							[Op.and]: [{ product_id }, { warehouse_id }],
						},
					}
				);
			});
		});

		res.status(200).send({ message: "Updated" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getWarehouse,
	getProductsByWarehouse,
	addProductByWarehouse,
	getDashboard,
	editProduct,
	deleteProduct,
	stockMonitoring,
	sentPackage,
	approveBukti,
	rejectBukti,
	kirimBarang
};
