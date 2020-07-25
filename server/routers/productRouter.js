const express = require("express");
const router = express.Router();

const ShopProduct = require("../models/productModel");

router.get("/", async (req, res) => {
  const products = await ShopProduct.find({});
  res.status(200).send(products);
});

module.exports = router;
