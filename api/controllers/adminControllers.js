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

const getProducts = async (req, res, next) => {
	try {
		let query = {
			where: {
				is_available: 1,
			},
		};
		if (req.query.keyword) {
			query.where = {
				...query.where,
				name: {
					[Op.like]: `%${req.query.keyword}%`,
				},
			};
		}
		if (req.query.category)
			query.where = {
				...query.where,
				category_id: parseInt(req.query.category),
			};
		if (req.query.max && req.query.min)
			query.where = {
				...query.where,
				price: {
					[Op.between]: [parseInt(req.query.min), parseInt(req.query.max)],
				},
			};
		if (req.query.sort == 1)
			query = { ...query, order: [["created_at", "DESC"]] };
		if (req.query.sort == 2)
			query = { ...query, order: [["created_at", "ASC"]] };
		if (req.query.sort == 3) query = { ...query, order: [["price", "ASC"]] };
		if (req.query.sort == 4) query = { ...query, order: [["price", "DESC"]] };
		query = {
			...query,
			include: [
				{
					model: category,
				},
			],
		};
		// const checkProductsStock = await product.findAll({
		// 	include: [{ model: inventory }, { model: category }],
		// });
		// let getIndex = [];
		// checkProductsStock.forEach((value) => {
		// 	if (
		// 		value.inventories[0].stock === 0 &&
		// 		value.inventories[1].stock === 0 &&
		// 		value.inventories[2].stock === 0
		// 	) {
		// 		getIndex.push(value.id);
		// 	}
		// });
		// await product.update(
		// 	{ is_available: 0 },
		// 	{
		// 		where: {
		// 			id: {
		// 				[Op.in]: getIndex,
		// 			},
		// 		},
		// 	}
		// );
		const getProducts = await product.findAll(query);
		const productImg = await productImage.findAll();
		const getInventory = await inventory.findAll();
		const getMaxPrice = await product.findOne({
			order: [["price", "DESC"]],
		});
		const getMinPrice = await product.findOne({
			order: [["price", "ASC"]],
		});
		const productsGetImageAndStock = getProducts.map((value) => {
			let num = 0;
			getInventory.forEach((item) => {
				if (item.product_id === value.id) {
					num += item.stock;
				}
			});
			return {
				...value,
				stock: num,
				image: productImg.filter((item) => {
					return item.product_id === value.id;
				}),
			};
		});
		const response = {
			maxPrice: getMaxPrice.price,
			minPrice: getMinPrice.price,
			products: productsGetImageAndStock,
		};
		return res.status(200).send(response);
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
	getProducts,
	getDashboard,
	sentPackage,
	approveBukti,
	rejectBukti,
	kirimBarang,
};
