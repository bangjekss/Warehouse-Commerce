const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const userStatus = sequelize.define(
	"user_status",
	{
		status: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = userStatus;
