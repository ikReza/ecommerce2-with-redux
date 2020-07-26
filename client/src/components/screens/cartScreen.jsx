import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Hidden,
  Grid,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import queryString from "query-string";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = (props) => {
  const productId = props.match.params.id;

  let { qty } = props.location.search
    ? queryString.parse(props.location.search)
    : 1;
  qty = Number(qty);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, [productId]);

  const removeCartHandle = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const confirmHandle = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return cartItems.length > 0 ? (
    <Box className="cart-container">
      <TableContainer className="cart-table-container">
        <Hidden xsDown>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Price($)/unit</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Price($)</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <Typography
                      component={Link}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <img
                      className="cart-image"
                      src={item.image}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <FormControl>
                      <Select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">{item.qty * item.price}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => removeCartHandle(item.product)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell align="right">
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Hidden>
      </TableContainer>

      <Hidden smUp>
        <Grid container justify="center" style={{ marginTop: "2vh" }}>
          <Grid item xs={10} className="xs-grid">
            {cartItems.map((item, i) => (
              <Box
                key={i}
                borderTop={1}
                borderBottom={1}
                className="xs-cart-img-box"
              >
                <img className="cart-image" src={item.image} alt={item.name} />
                <Box align="left" className="xs-cart-description-box">
                  <Typography component={Link} to={`/product/${item.product}`}>
                    {item.name}
                  </Typography>
                  <Box component="div">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.inStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <IconButton onClick={() => removeCartHandle(item.product)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <Typography
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    margin: "auto 0 auto 2vw",
                  }}
                >
                  ${item.qty * item.price}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item container xs={10} justify="flex-end">
            <Typography style={{ marginTop: "1vh" }}>
              Total Price: ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </Typography>
          </Grid>
          <Grid item container xs={10} justify="flex-end">
            <Button
              variant="contained"
              size="small"
              onClick={confirmHandle}
              style={{ marginTop: "1vh" }}
            >
              Confirm Order
            </Button>
          </Grid>
        </Grid>
      </Hidden>
      <Box className="cart-confirm-xs">
        <Hidden xsDown>
          <Button variant="contained" size="small" onClick={confirmHandle}>
            Confirm Order
          </Button>
        </Hidden>
      </Box>
    </Box>
  ) : (
    <Box component="div" className="cart-empty-box">
      <Typography>Your Cart is Empty!</Typography>
    </Box>
  );
};

export default CartScreen;
