const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const warehouse = sequelize.define(
  "warehouse",
  {
    warehouse: DataTypes.STRING,
    alamat_lengkap: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kota: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kode_pos: DataTypes.STRING,
    phone: DataTypes.STRING,
    long: DataTypes.DECIMAL,
    lat: DataTypes.DECIMAL,
    city_id: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = warehouse;
