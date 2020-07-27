import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import ShippingScreen from "./screens/ShippingScreen";

const Mix = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["SignIn", "Shipping", "Payment", "Place Order"];
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <ShippingScreen />
      </div>
    </div>
  );
};

export default Mix;
