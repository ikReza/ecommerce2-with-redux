import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Footer from "./Footer";
//import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  //   const userSignin = useSelector((state) => state.userSignin);
  //   const { userInfo } = userSignin;
  //   console.log(userInfo);
  const userInfo = false;

  const sideList = () => (
    <Box
      component="div"
      className="menuSliderContainer"
      onClick={() => setIsOpen(false)}
    >
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Shirt" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Pant" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <AppBar position="static" style={{ background: "#1d2736" }}>
        <Toolbar>
          <IconButton onClick={() => setIsOpen(true)}>
            <Menu style={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, textDecoration: "none", color: "tomato" }}
            component={Link}
            to="/"
          >
            Amazona
          </Typography>
          <>
            <Button component={Link} to="/cart" className="navbar-cart-btn">
              Cart
            </Button>
            {userInfo ? (
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                {userInfo.name}
              </Link>
            ) : (
              <Button component={Link} to="/signin" className="navbar-cart-btn">
                Sign In
              </Button>
            )}
          </>
          <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
            {sideList()}
            <Footer />
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
