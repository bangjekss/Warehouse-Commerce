const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const cart = require("./cart");
const category = require("./category");
const inventory = require("./inventory");
const productImage = require("./productImage");
const warehouse = require("./warehouse");

const product = sequelize.define(
  "product",
  {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    description: DataTypes.STRING,
    category_id: DataTypes.TINYINT,
    is_available_all: DataTypes.TINYINT,
    created_at: DataTypes.DATE,
    is_available: DataTypes.TINYINT,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Relasi product dengan gambar - One to Many
product.hasMany(productImage, {
  foreignKey: "product_id",
});
productImage.belongsTo(product, {
  foreignKey: "product_id",
});

// Relasi product dengan cart (junction table) - One to Many
product.hasMany(cart, {
  foreignKey: "product_id",
});
cart.belongsTo(product, {
  foreignKey: "product_id",
});

// Relasi product dengan category - One to Many
category.hasOne(product, {
  foreignKey: "category_id",
});
product.belongsTo(category, {
  foreignKey: "category_id",
});

product.belongsToMany(warehouse, {
  foreignKey: "product_id",
  otherKey: "warehouse_id",
  through: inventory,
});
warehouse.belongsToMany(product, {
  foreignKey: "warehouse_id",
  otherKey: "product_id",
  through: inventory,
});

category.hasMany(product, {
  foreignKey: "category_id",
});
product.belongsTo(category, {
  foreignKey: "category_id",
});

product.hasMany(inventory, {
  foreignKey: "product_id",
});
inventory.belongsTo(product, {
  foreignKey: "product_id",
});

module.exports = product;
