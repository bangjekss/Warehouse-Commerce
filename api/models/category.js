const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const category = sequelize.define(
	"category",
	{
		category: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = category;
