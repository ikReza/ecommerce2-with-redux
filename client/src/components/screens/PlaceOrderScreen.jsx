import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

const PlaceOrderScreen = (props) => {
  const steps = ["SignIn", "Shipping", "Payment", "Place Order"];

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

  return (
    <Grid container alignItems="center" direction="column" spacing={1}>
      <Grid item>
        <Stepper activeStep={3} alternativeLabel>
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
          border={1}
          xs={11}
          sm={7}
          md={8}
          spacing={1}
        >
          <Grid item component={Box} item border={1}>
            <Typography gutterBottom>Address</Typography>
            <Typography>
              {shipping.address}, {shipping.city}, {shipping.postalCode},{" "}
              {shipping.country}
            </Typography>
          </Grid>
          <Grid item component={Box} item border={1}>
            <Typography gutterBottom>Payment</Typography>
            <Typography>Payment Method: {payment.paymentMethod}</Typography>
          </Grid>
          <Grid item component={Box} border={1} align="center">
            <Box
              borderBottom={1}
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Order Items</Typography>
              <Typography>Price</Typography>
            </Box>
            <Box
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ display: "flex" }}>
                <Typography>Image</Typography>
                <Box>
                  <Typography>Shirt A</Typography>
                  <Typography>Qty 1</Typography>
                </Box>
              </Box>
              <Typography>$60</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={11} sm={5} md={4}>
          <Box
            component="ul"
            border={1}
            style={{
              width: "90%",
              height: "200px",
              listStyle: "none",
              marginRight: "40px",
              paddingRight: "40px",
            }}
          >
            <Button component="li" variant="outlined" fullWidth>
              Place Order
            </Button>
            <Typography component="li" gutterBottom>
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
