const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("penjual", "pelanggan"),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const count = await User.count({ where: { role: user.role } });
        const prefix = user.role === "penjual" ? "penjual" : "pelanggan";
        user.id = `${prefix}${count + 1}`;
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

module.exports = User;
