"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "customers",
      [
        {
          name: "Mark Zuckerberg",
          identity_number: "F4C3800K",
          phone: "8699288821",
          image:
            "https://ichef.bbci.co.uk/news/660/cpsprodpb/125B3/production/_107178157_178151.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Elon Musk",
          identity_number: "5P4C3X",
          phone: "1122093211",
          image:
            "https://www.biography.com/.image/t_share/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Nadiem",
          identity_number: "60J3K1ND0N3514",
          phone: "628599092132",
          image:
            "https://asset.kompas.com/crops/Q-ZHO2PnxZ3gKgaHhcDYqgQi5GM=/1x0:1500x999/750x500/data/photo/2019/10/23/5db025c3df6e3.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("customers", null, {});
  }
};
