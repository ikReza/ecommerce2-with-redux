const express = require("express");
const router = express.Router();

const ShopProduct = require("../models/productModel");
const { isAuth, isAdmin } = require("../util");

router.get("/", async (req, res) => {
  try {
    const products = await ShopProduct.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await ShopProduct.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Product Not Found" });
  }
});

router.post("/", async (req, res) => {
  const product = new ShopProduct({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  try {
    const newProduct = await product.save();
    res.status(200).send({ message: "New Product Created", data: newProduct });
  } catch (err) {
    res.status(400).send({ message: " Error in Creating Product." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedProduct = await ShopProduct.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "Product Deleted" });
  } catch (err) {
    res.status(400).send({ message: "Error in deletion" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedProduct = await ShopProduct.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          brand: req.body.brand,
          category: req.body.category,
          countInStock: req.body.countInStock,
          description: req.body.description,
        },
      }
    );

    res.status(200).send({ message: "Product Updated", data: updatedProduct });
  } catch (err) {
    res.status(400).send({ message: "Error in Updating Product" });
  }
});

module.exports = router;
