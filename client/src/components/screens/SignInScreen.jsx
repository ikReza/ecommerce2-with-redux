import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, TextField, Button, Typography } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import { signin } from "./actions/userActions";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = false;
  const error = false;
  const loading = false;
  //   const userSignin = useSelector((state) => state.userSignin);
  //   const { loading, userInfo, error } = userSignin;
  //   const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //dispatch(signin(email, password));
  };

  return (
    <Grid
      container
      justify="center"
      style={{ height: "70vh", alignItems: "center" }}
    >
      <Grid item xs={10} sm={7} md={5}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography align="center" variant="h4" gutterBottom>
            Sign In
          </Typography>
          {loading && (
            <Typography variant="subtitle2">Loading. .. ...</Typography>
          )}
          {error && (
            <Typography
              variant="subtitle2"
              align="center"
              style={{ color: "red" }}
            >
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            fullWidth
            type="submit"
            className="signin-btn-main"
          >
            Sign In
          </Button>
          <Typography align="center">New to Amazona?</Typography>
          <Typography align="center">
            Create New Account:{" "}
            <Button
              component={Link}
              to="/register"
              className="signup-btn-secondary"
            >
              Sign Up
            </Button>{" "}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInScreen;
