import {
  ADD_TO_CART,
  DELETE_ALL_FROM_CART,
  DELETE_FROM_CART,
  ERROR_CART,
  GET_CART,
  UPDATE_QUANTITY,
} from "../actions/cartActions";

const initState = {
  items: [], // Ensuring items is always an array.
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, ...action.payload };

    case ADD_TO_CART:
      const { item, quantityCount } = action.payload;
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === item.id ? { ...it, qty: quantityCount } : it
        ),
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: (state.items || []).map((it) =>
          it.id === action.payload.item.id
            ? {
                ...it,
                pivot: { ...it.pivot, qty: action.payload.quantityCount },
              }
            : it
        ),
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.payload.item.id),
      };

    case DELETE_ALL_FROM_CART:
      return initState;

    case ERROR_CART:
      // Handle error state appropriately, possibly logging or setting an error message in state
      return state;

    default:
      return state;
  }
};
export default cartReducer;
