import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";

const PaymentScreen = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const steps = ["SignIn", "Shipping", "Payment", "Place Order"];

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("placeorder");
  };

  return (
    <Grid
      container
      justify="center"
      style={{ height: "70vh", alignItems: "center" }}
    >
      <Grid item xs={10} sm={7} md={5}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography align="center" variant="h4" gutterBottom>
            Payment
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="Paypal"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="outlined"
            fullWidth
            type="submit"
            className="signin-btn-main"
          >
            Continue
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentScreen;
