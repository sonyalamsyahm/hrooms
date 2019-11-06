const jwt = require("jsonwebtoken");
// const Sequelize = require("sequelize");
const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ userId: user.id }, "my-secret-key");
        res.status(200).json({
          id: user.id,
          token
        });
      } else {
        res.status(400).json({ message: "Password wrong" });
      }
    } else {
      res.status(400).json({ message: "Unregistered emai" });
    }
  });
};

exports.register = (req, res) => {
  const { email, password, name, image } = req.body;

  User.findAll({
    where: { email }
  }).then(data => {
    // console.log(data);
    if (data.length > 0) {
      res.status(401).json({ message: "Email Already Exists!" });
    } else {
      User.create({
        email,
        password,
        name,
        image
      }).then(item => {
        res.send(item);
      });
    }
  });
};
