const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");

const ShippingDetails = sequelize.define("ShippingDetails", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Order,
      key: "id",
    },
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shippingCompany: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("tertunda", "terkirim", "sudah diterima"),
    allowNull: false,
  },
  estimatedDelivery: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

ShippingDetails.belongsTo(Order, { foreignKey: "orderId" });

module.exports = ShippingDetails;
