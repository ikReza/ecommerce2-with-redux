import axios from "axios";
import Cookie from "js-cookie";
import * as actions from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `https://ecommer-with-redux.herokuapp.com/api/products/${productId}`
    );
    dispatch({
      type: actions.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        inStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  try {
    dispatch({ type: actions.CART_REMOVE_ITEM, payload: productId });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: actions.CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: actions.CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
