const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const paymentMethod = sequelize.define(
	"payment_method_id",
	{
		payment: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = paymentMethod;
