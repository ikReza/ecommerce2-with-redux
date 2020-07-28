import axios from "axios";
import * as actions from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CREATE_REQUEST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();

    // const { data } = await axios.post(
    //   "http://localhost:5000/api/orders",
    //   order,
    //   {
    //     headers: {
    //       Authorization: " Bearer " + userInfo.token,
    //     },
    //   }
    // );
    // console.log("data: ", data);

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

export { createOrder };
