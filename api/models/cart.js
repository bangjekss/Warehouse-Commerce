const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const cart = sequelize.define(
	"cart",
	{
		qty: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = cart;
