const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const invoice = sequelize.define(
	"invoice",
	{
		invoice: DataTypes.STRING,
		note: DataTypes.STRING,
		shipping: DataTypes.STRING,
		transaction_id: DataTypes.INTEGER,
		created_at: DataTypes.DATE,
		due_on: DataTypes.DATE,
		invoicepath: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = invoice;
