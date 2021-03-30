const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const productImage = sequelize.define(
	"product_image",
	{
		imagepath: DataTypes.STRING,
		product_id: DataTypes.INTEGER,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = productImage;
