import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {};
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };

  return (
    <Grid
      container
      justify="center"
      style={{ height: "70vh", alignItems: "center" }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography
            align="center"
            variant="h4"
            gutterBottom
            style={{ marginBottom: "5vh" }}
          >
            Sign In
          </Typography>
          {loading && (
            <Typography variant="subtitle2">
              <LinearProgress style={{ width: "100%" }} />
            </Typography>
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
          <Typography align="center" style={{ marginTop: "2vh" }}>
            Create New Account:
            <Button
              component={Link}
              //Find out if user came from shipping page or not
              to={
                redirect === "/" ? "register" : `register?redirect=${redirect}`
              }
              className="signup-btn-secondary"
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInScreen;
