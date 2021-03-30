const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const securityQuestion = require("./securityQuestion");
const userAddress = require("./userAddress");

const user = sequelize.define(
  "user",
  {
    email: DataTypes.STRING,
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    phone: DataTypes.STRING,
    security_answer: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    security_question_id: DataTypes.INTEGER,
    email_verification_id: DataTypes.INTEGER,
    user_status_id: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

user.belongsTo(securityQuestion, {
  foreignKey: "security_question_id",
});
securityQuestion.hasMany(user, {
  foreignKey: "security_question_id",
});

userAddress.belongsTo(user, {
  as: "user_address",
  foreignKey: "user_id",
});
user.hasMany(userAddress, {
  as: "user_address",
  foreignKey: "user_id",
});

module.exports = user;
