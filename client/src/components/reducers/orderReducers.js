import * as actions from "../constants/orderConstants";

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case actions.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actions.ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case actions.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { orderCreateReducer };
