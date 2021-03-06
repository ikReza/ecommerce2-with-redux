import React, { useEffect } from "react";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = (props) => {
  const steps = ["SignIn", "Shipping", "Payment", "Place Order"];
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 10;
  const tax = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + tax;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const submitHandle = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        tax,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
  }, [success]);

  return (
    <Grid container alignItems="center" direction="column" spacing={1}>
      <Grid item xs={11} sm={11} md={11}>
        <Stepper activeStep={3} alternativeLabel className="placeorder-stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item container xs={11} sm={11} md={11} border={1} spacing={1}>
        <Grid
          item
          container
          direction="column"
          component={Box}
          xs={11}
          sm={7}
          md={8}
        >
          <Grid item component={Box} item className="placeorder-box">
            <Typography gutterBottom variant="h5">
              Address
            </Typography>
            <Typography variant="subtitle2">
              {shipping.address}, {shipping.city}, {shipping.postalCode},{" "}
              {shipping.country}
            </Typography>
          </Grid>
          <Grid item component={Box} item className="placeorder-box">
            <Typography gutterBottom variant="h5">
              Payment
            </Typography>
            <Typography variant="subtitle2">
              Payment Method: {payment.paymentMethod}
            </Typography>
          </Grid>
          <Grid item component={Box} align="center" className="placeorder-box">
            <Box borderBottom={1} className="box3-placeorder">
              <Typography variant="h6">Order Items</Typography>
              <Typography variant="h6">Price</Typography>
            </Box>
            {cartItems.length === 0 ? (
              <div>Cart is empty</div>
            ) : (
              cartItems.map((item, i) => (
                <Box key={i} className="box3-placeorder">
                  <Box style={{ display: "flex" }}>
                    <img
                      src={item.image}
                      className="cart-image"
                      alt={item.name}
                    />
                    <Box className="placeorder-box3-head">
                      <Typography>{item.name}</Typography>
                      <Typography>Qty: {item.qty}</Typography>
                    </Box>
                  </Box>
                  <Typography>${item.price}</Typography>
                </Box>
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={11} sm={5} md={4}>
          <Box component="ul" className="box4-placeorder">
            <Button
              component="li"
              variant="outlined"
              className="placeorder-btn"
              fullWidth
              onClick={submitHandle}
            >
              Place Order
            </Button>
            <Typography component="li" gutterBottom variant="h6">
              Order Summary
            </Typography>

            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Items</Typography>
              <Typography>${itemsPrice}</Typography>
            </Box>
            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Shipping</Typography>
              <Typography>${shippingPrice}</Typography>
            </Box>
            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Tax</Typography>
              <Typography>${tax}</Typography>
            </Box>
            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Order Total</Typography>
              <Typography>${totalPrice}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlaceOrderScreen;
