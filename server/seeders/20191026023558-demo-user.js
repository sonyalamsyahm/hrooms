"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@twhotel.com",
          password: "Twhotel",
          name: "Admin",
          avatar:
            "https://pbs.twimg.com/profile_images/378800000433315572/4e22ec3530960ac2fb70826d3a84061d_400x400.jpeg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "sony@gmail.com",
          password: "sony",
          name: "Sony",
          avatar:
            "https://pbs.twimg.com/profile_images/378800000433315572/4e22ec3530960ac2fb70826d3a84061d_400x400.jpeg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
