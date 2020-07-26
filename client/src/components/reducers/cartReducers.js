import * as actions from "../constants/cartConstants";

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case actions.CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      //if previous same product found, then erase the previous and add the new one.
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      //if the above condition is not true.
      return { cartItems: [...state.cartItems, item] };
    case actions.CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
}

export { cartReducer };
