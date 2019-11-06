//import env
require("dotenv").config();

//instantiate express module
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

require("express-group-routes");

//use express in app variable
const app = express();
//define the server port
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname);
  }
});

const upload = multer({ storage });

//controller
const AuthController = require("./controller/auth");
const getMethod = require("./controller/getData");
const postMethod = require("./controller/postData");
const putMethod = require("./controller/putData");

//default by node.js/express.js
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const { authenticated, authorized } = require("./middleware");

app.group("/api/v2", router => {
  //POST
  router.post("/login", AuthController.login);
  router.post("/room", authenticated, postMethod.addRoom);
  router.post("/customer", authenticated, postMethod.addCustomer);
  router.post("/checkin", authenticated, postMethod.addOrder);
  router.post("/register", AuthController.register);

  //GET
  router.get("/rooms", authenticated, getMethod.getRooms);
  router.get("/customers", authenticated, getMethod.getCustomers);
  router.get("/checkins", authenticated, getMethod.getCheckins);
  router.get("/user/:id", authenticated, getMethod.getUser);

  //PUT
  router.put("/room/:id", authenticated, putMethod.editRoom);
  router.put("/customer/:id", authenticated, putMethod.editCustomer);
  router.put("/order/:id_order", authenticated, putMethod.updateOrder);
  router.put(
    "/profile/:id_user",
    authenticated,
    upload.single("avatar"),
    putMethod.updateProfile
  );
});

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));
