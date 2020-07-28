const express = require("express");
const router = express.Router();

const ShopUser = require("../models/userModel");
const { getToken } = require("../util");

router.post("/register", async (req, res) => {
  const user = new ShopUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } catch (err) {
    res.status(401).send({ message: "Invalid User Data" });
  }
});

router.post("/signin", async (req, res) => {
  const user = await ShopUser.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password" });
  }
});

router.post("/createadmin", async (req, res) => {
  try {
    const user = new ShopUser({
      name: "Ibrahim",
      email: "ireza.kaiser00@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
