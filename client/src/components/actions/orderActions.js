import axios from "axios";
import * as actions from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CREATE_REQUEST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();

    const {
      data: { data: newOrder },
    } = await axios.post("http://localhost:5000/api/orders", order, {
      headers: {
        Authorization: " Bearer " + userInfo.token,
      },
    });
    console.log("newOrder: ", newOrder);
    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: actions.ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.ORDER_DETAILS_FAIL, payload: error.message });
  }
};

export { createOrder, detailsOrder };
