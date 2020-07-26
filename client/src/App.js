import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignInScreen from "./components/screens/SignInScreen";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <Route path="/" exact component={Home} />
        <Route path="/products" component={ProductsScreen} /> */}
        <Route path="/signin" exact component={SignInScreen} />
        {/* <Route path="/product/:id" exact component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/register" component={Register} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
