const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const inventory = sequelize.define(
	"inventory",
	{
		stock: DataTypes.INTEGER,
		booked_stock: DataTypes.INTEGER,
		warehouse_id: DataTypes.SMALLINT,
		product_id: DataTypes.INTEGER,
		updated_at: DataTypes.DATE,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = inventory;
