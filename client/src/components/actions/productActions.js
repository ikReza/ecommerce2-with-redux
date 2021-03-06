import axios from "axios";
import * as actions from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      "https://ecommer-with-redux.herokuapp.com/api/products"
    );
    dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      `https://ecommer-with-redux.herokuapp.com/api/products/${productId}`
    );
    dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await axios.post(
        "https://ecommer-with-redux.herokuapp.com/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      console.log("front: ", userInfo.token);
      dispatch({ type: actions.PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.patch(
        `https://ecommer-with-redux.herokuapp.com/api/products/${product._id}`,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: actions.PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    error.response
      ? dispatch({
          type: actions.PRODUCT_SAVE_FAIL,
          payload: error.response.data.message,
        })
      : dispatch({ type: actions.PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: actions.PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(
      `https://ecommer-with-redux.herokuapp.com/api/products/${productId}`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({
      type: actions.PRODUCT_DELETE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    error.response
      ? dispatch({
          type: actions.PRODUCT_DELETE_FAIL,
          payload: error.response.data.message,
        })
      : dispatch({ type: actions.PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listProducts, detailsProduct, saveProduct, deleteProdcut };
