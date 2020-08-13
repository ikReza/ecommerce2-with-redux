import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { CreditCard } from "@material-ui/icons";

const Payment = () => {
  const [open, setOpen] = useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box component="div">
      <Button
        variant="outlined"
        className="placeorder-btn"
        fullWidth
        startIcon={<CreditCard />}
        //onClick={submitHandle}
        onClick={handleClickOpen}
      >
        Add Credit Card
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box className="payment-card">
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
        </Box>
        <Box component="form">
          <DialogTitle>Credit Card Information</DialogTitle>
          <DialogContent className="payment-textfields">
            <TextField
              margin="dense"
              type="tel"
              variant="outlined"
              name="number"
              label="Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              className="payment-txtfield"
            />
            <TextField
              margin="dense"
              variant="outlined"
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              className="payment-txtfield"
            />
            <TextField
              margin="dense"
              variant="outlined"
              label="MM/YY Expiry"
              name="expiry"
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              className="payment-txtfield"
            />
            <TextField
              type="tel"
              margin="dense"
              variant="outlined"
              name="cvc"
              label="CVC"
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              className="payment-txtfield"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleClose}
              className="payment-btn"
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Payment;
