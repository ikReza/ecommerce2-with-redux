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

function orderDetailsReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case actions.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case actions.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case actions.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function myOrderListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case actions.MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case actions.MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case actions.MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { orderCreateReducer, orderDetailsReducer, myOrderListReducer };
