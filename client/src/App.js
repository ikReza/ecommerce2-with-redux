import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/screens/Home";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/cartScreen";
import SignInScreen from "./components/screens/SignInScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProductsScreen from "./components/screens/ProductsScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/signin" component={SignInScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/products" component={ProductsScreen} />
        <Route path="/order/:id" component={OrderScreen} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
