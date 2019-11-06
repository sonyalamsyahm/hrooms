const models = require("../models");
const Room = models.room;
const Customer = models.customer;
const Order = models.order;
const User = models.user;

// generateData = data => {
//   const newData = data.map(item => {
//     const letData = {
//       id: item.id,
//       name: item.name,
//       generateDataCustomer()
//     }
//   })
// };

const generateDataCustomer = data => {
  const newData = data.map(item => {
    const customer = item.customers.map(newData => {
      const newCustomer = {
        id: newData.id,
        name: newData.name,
        identity_number: newData.identity_number,
        phone_number: newData.phone,
        image: newData.image
      };
      return newCustomer;
    });
    const order = item.customers.map(newItem => {
      const {
        id,
        duration,
        is_booked,
        is_done,
        order_end_time
      } = newItem.order;
      const newOrder = {
        id,
        is_booked,
        is_done,
        duration,
        order_end_time
      };
      return newOrder;
    });
    const dataRoom = {
      id: item.id,
      name: item.name,
      customer: customer[0],
      order: order[0]
    };
    return dataRoom;
  });
  return newData;
};

exports.getRooms = (req, res) => {
  Room.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(400).json({ message: "Bad Request" });
    });
};

exports.getCustomers = (req, res) => {
  Customer.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(400).json({ message: "Bad Request" });
    });
};

exports.getCheckins = (req, res) => {
  Room.findAll({
    include: [
      {
        model: Customer,
        as: "customers",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: {
          model: Order,
          where: { is_done: false },
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      }
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] }
  }).then(data => {
    const newData = generateDataCustomer(data);
    res.send(newData);
    // res.send(data);
  });
};

exports.getUser = (req, res) => {
  const id_user = req.params.id;
  User.findOne({
    where: { id: id_user },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  })
    .then(item => {
      res.send(item);
    })
    .catch(error => {
      res.send(error);
    });
};
