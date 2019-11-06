const models = require("../models");
const Room = models.room;
const Customer = models.customer;
const Order = models.order;

exports.addRoom = (req, res) => {
  const roomName = req.body.name;
  Room.findOne({
    where: { name: roomName }
  }).then(data => {
    if (data) {
      res.status(401).json({ message: "Room is already exists" });
    } else {
      Room.create({
        name: roomName
      })
        .then(item => {
          Room.findAll({}).then(data => {
            res.status(200).send(data);
          });
        })
        .catch(error => {
          res.status(400).json({ message: "error when create data" });
        });
    }
  });
};

exports.addCustomer = (req, res) => {
  const { name, identity_number, phone_number, image } = req.body;

  Customer.findOne({
    where: { identity_number }
  }).then(data => {
    if (data) {
      res.status(401).json({ message: "Customer is already exist" });
    } else {
      Customer.create({
        name: name,
        identity_number: identity_number,
        phone: phone_number,
        image: image
      }).then(item => {
        Customer.findAll({}).then(data => {
          res.send(data);
        });
      });
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

exports.addOrder = (req, res) => {
  const { room_id, customer_id, duration } = req.body;

  Order.findOne({
    where: { room_id, is_booked: true, is_done: false }
  }).then(data => {
    if (data) {
      res.status(400).json({ message: "Room already booked!" });
    } else {
      const time = new Date();
      time.setMinutes(time.getMinutes() + duration);

      Order.create({
        customer_id,
        room_id,
        is_booked: true,
        is_done: false,
        duration,
        order_end_time: time
      }).then(items => {
        if (items) {
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
          }).then(datas => {
            const newData = generateDataCustomer(datas);
            res.send(newData);
            //res.send(data);
          });
        } else {
          res.status(400).json({ message: "Error while add data" });
        }
      });
    }
  });
};
