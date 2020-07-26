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
import { register } from "../actions/userActions";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Password didn't match");
      setRePassword("");
    } else {
      dispatch(register(name, email, password));
    }
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
            Create Account
          </Typography>
          {loading && (
            <Typography variant="subtitle2">
              <LinearProgress style={{ width: "100%" }} />
            </Typography>
          )}
          {error && <Typography variant="subtitle2">{error}</Typography>}
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
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Re-Enter Password"
            type="password"
            required
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <Button
            variant="outlined"
            fullWidth
            type="submit"
            className="signin-btn-main"
          >
            Register
          </Button>
          <Typography align="center">
            Already a member?{" "}
            <Button
              component={Link}
              to="/signin"
              className="signup-btn-secondary"
            >
              Sign In
            </Button>{" "}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterScreen;
