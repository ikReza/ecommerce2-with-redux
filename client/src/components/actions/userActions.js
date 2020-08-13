import axios from "axios";
import Cookie from "js-cookie";
import * as actions from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: actions.USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(
      "https://ecommer-with-redux.herokuapp.com/api/users/signin",
      {
        email,
        password,
      }
    );
    dispatch({ type: actions.USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actions.USER_SIGNIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: actions.USER_REGISTER_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await axios.post(
      "https://ecommer-with-redux.herokuapp.com/api/users/register",
      {
        name,
        email,
        password,
      }
    );
    dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actions.USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export { signin, register };
