import React, { useEffect } from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { CreditCard } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, detailsOrder } from "../actions/orderActions";

const OrderScreen = (props) => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));

    return () => {};
  }, []);

  return loading ? (
    <Box>Loading. .. ...</Box>
  ) : error ? (
    <Box>{error}</Box>
  ) : (
    <Grid container alignItems="center" direction="column" spacing={1}>
      <Grid item xs={11} sm={11} md={11}>
        <Box style={{ margin: "2vh auto" }}>Order No: {order._id}</Box>
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
              {order.shipping.address}, {order.shipping.city},{" "}
              {order.shipping.postalCode}, {order.shipping.country}
            </Typography>
            <Typography variant="body2">
              {order.isPaid ? (
                <span style={{ color: "green" }}>Paid at {order.paidAt}</span>
              ) : (
                <span style={{ color: "red" }}>Not Paid</span>
              )}
            </Typography>
          </Grid>
          <Grid item component={Box} item className="placeorder-box">
            <Typography gutterBottom variant="h5">
              Payment
            </Typography>
            <Typography variant="subtitle2">
              Payment Method: {order.payment.paymentMethod}
            </Typography>
          </Grid>
          <Grid item component={Box} align="center" className="placeorder-box">
            <Box borderBottom={1} className="box3-placeorder">
              <Typography variant="h6">Order Items</Typography>
              <Typography variant="h6">Price</Typography>
            </Box>
            {order.orderItems.length === 0 ? (
              <div>Cart is empty</div>
            ) : (
              order.orderItems.map((item, i) => (
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
              startIcon={<CreditCard />}
              //onClick={submitHandle}
            >
              Add Credit Card
            </Button>
            <Typography component="li" gutterBottom variant="h6">
              Order Summary
            </Typography>

            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Items</Typography>
              <Typography>${order.itemsPrice}</Typography>
            </Box>
            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Shipping</Typography>
              <Typography>${order.shippingPrice}</Typography>
            </Box>
            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Tax</Typography>
              <Typography>${order.tax}</Typography>
            </Box>
            <Box
              component="li"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Order Total</Typography>
              <Typography>${order.totalPrice}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderScreen;
