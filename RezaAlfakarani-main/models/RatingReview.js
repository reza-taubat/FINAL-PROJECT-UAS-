const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");

const RatingReview = sequelize.define("RatingReview", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  reviewText: {
    type: DataTypes.TEXT,
  },
});

RatingReview.belongsTo(User, { foreignKey: "userId" });
RatingReview.belongsTo(Product, { foreignKey: "productId" });
RatingReview.belongsTo(Order, { foreignKey: "orderId" });

module.exports = RatingReview;
