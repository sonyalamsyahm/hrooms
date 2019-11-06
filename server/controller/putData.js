const models = require("../models");
const Room = models.room;
const Customer = models.customer;
const Order = models.order;
const User = models.user;

exports.editRoom = (req, res) => {
  const id_room = req.params.id;
  const name = req.body.name;

  Room.findAll({}).then(data => {
    const newData = data.map(item => {
      let myData = item.name;
      return myData;
    });
    const items = newData.filter(item => item == name);
    console.log(items);
    if (!items[0]) {
      Room.findAll({
        where: { id: id_room }
      })
        .then(data => {
          Room.update(
            {
              name: req.body.name
            },
            {
              where: { id: id_room }
            }
          ).then(response => {
            Room.findAll({}).then(item => {
              res.send(item);
            });
          });
        })
        .catch(error => {
          res.status(400).json({ message: "Bad Request" });
        });
    } else {
      res.status(401).json({ message: "Room is already exists" });
    }
  });
};

exports.editCustomer = (req, res) => {
  const id_customer = req.params.id;
  const { name, identity_number, phone_number, image } = req.body;

  Customer.findAll({
    where: { id: id_customer }
  }).then(data => {
    if (data.length > 0 && req.params.id == id_customer) {
      Customer.update(
        {
          name,
          identity_number,
          phone: phone_number,
          image
        },
        {
          where: { id: id_customer }
        }
      ).then(item => {
        Customer.findAll({}).then(datas => {
          res.send(datas);
        });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

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

exports.updateOrder = (req, res) => {
  const { id_order } = req.params;

  Order.update(
    {
      is_done: true,
      is_booked: false
    },
    {
      where: { id: id_order, is_done: false, is_booked: true }
    }
  ).then(() => {
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
      //res.send(data);
    });
  });
};

exports.updateProfile = (req, res) => {
  const { id_user } = req.params;
  const avatar = process.env.BASE_URL + req.file.path;
  console.log(avatar);
  User.update(
    {
      avatar
    },
    {
      where: { id: id_user }
    }
  ).then(() => {
    User.findOne({
      where: { id: id_user },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(data);
    });
  });
};
