"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      is_booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      order_end_time: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {}
  );
  order.associate = function(models) {
    order.belongsTo(models.customer, {
      foreignKey: "customer_id",
      sourceKey: "id"
    });
    order.belongsTo(models.room, {
      foreignKey: "room_id",
      sourceKey: "id"
    });
  };
  return order;
};
