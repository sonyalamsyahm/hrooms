"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orders",
      [
        {
          customer_id: 1,
          room_id: 1,
          is_done: false,
          is_booked: true,
          duration: 30,
          order_end_time: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customer_id: 2,
          room_id: 2,
          is_done: false,
          is_booked: true,
          duration: 40,
          order_end_time: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customer_id: 3,
          room_id: 3,
          is_done: false,
          is_booked: true,
          duration: 45,
          order_end_time: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  }
};
