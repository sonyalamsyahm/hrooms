"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define("customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identity_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  customer.associate = function(models) {
    customer.belongsToMany(models.room, {
      through: models.order,
      as: "rooms",
      foreignKey: "customer_id"
    });
  };
  return customer;
};
