const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const emailVerification = sequelize.define(
	"email_verification",
	{
		status: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = emailVerification;
