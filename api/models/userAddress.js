const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const userAddress = sequelize.define(
	"user_address",
	{
		is_main: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER,
		label: DataTypes.STRING,
		alamat_lengkap: DataTypes.STRING,
		provinsi: DataTypes.STRING,
		kota: DataTypes.STRING,
		kecamatan: DataTypes.STRING,
		kelurahan: DataTypes.STRING,
		kode_pos: DataTypes.STRING,
		long: DataTypes.DECIMAL,
		lat: DataTypes.DECIMAL,
		phone: DataTypes.STRING,
		city_id: DataTypes.INTEGER,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = userAddress;
