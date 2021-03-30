const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const role = sequelize.define(
	"role",
	{
		role: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = role;
