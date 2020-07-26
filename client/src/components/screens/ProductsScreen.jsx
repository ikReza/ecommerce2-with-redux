import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { saveProduct, listProducts } from "../actions/productActions";

const ProductsScreen = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  //list of products
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);

  //save product
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const openModal = (product) => {
    setModal(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return modal ? (
    <Grid
      container
      justify="center"
      style={{ height: "70vh", alignItems: "center" }}
    >
      <Grid item xs={10} sm={7} md={5}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography align="center" variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setModal(false)}
            style={{ margin: "1vh auto" }}
          >
            Back to the details
          </Button>
          {loadingSave && (
            <Typography variant="subtitle2">
              <LinearProgress />
            </Typography>
          )}
          {errorSave && (
            <Typography
              variant="subtitle2"
              align="center"
              style={{ color: "red" }}
            >
              {errorSave}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Image"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Description"
            required
            multiline
            row={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Count In Stock"
            required
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <Button
            variant="outlined"
            fullWidth
            type="submit"
            style={{ margin: "1vh auto" }}
          >
            {id ? "Update" : "Create"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <Box className="cart-container">
      <Button
        variant="outlined"
        fullWidth
        onClick={() => openModal({})}
        style={{ margin: "1vh auto" }}
      >
        Create Product
      </Button>
      {loading ? (
        <Box component="div" className="loading-box">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <TableContainer className="cart-table-container">
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price($)</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((item, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <Typography>{item._id}</Typography>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.category}</TableCell>
                  <TableCell align="right">{item.brand}</TableCell>
                  <TableCell align="right">
                    <Button small onClick={() => openModal(item)}>
                      Edit
                    </Button>
                    <Button small>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProductsScreen;
