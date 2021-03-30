const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const securityQuestion = sequelize.define(
	"security_question",
	{
		question: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = securityQuestion;
