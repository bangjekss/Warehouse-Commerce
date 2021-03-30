const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const monthly_report = sequelize.define(
	"monthly_report",
	{
		month: DataTypes.STRING,
		year: DataTypes.STRING,
		total_order: DataTypes.INTEGER,
		profit: DataTypes.INTEGER,
		first_date: DataTypes.DATE,
		last_date: DataTypes.DATE,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = monthly_report;
