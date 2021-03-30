const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const orderStatus = sequelize.define(
	"order_status",
	{
		order_status: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = orderStatus;
