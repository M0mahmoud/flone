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
      // Explicitly updating only the items array
      return { ...state, items: action.payload.items || [] };

    case ADD_TO_CART:
      const { item, quantityCount } = action.payload;
      const existingIndex = state.items.findIndex((it) => it.id === item.id);
      if (existingIndex !== -1) {
        // Update quantity if item exists
        const newItems = state.items.slice();
        newItems[existingIndex] = {
          ...state.items[existingIndex],
          qty: quantityCount,
        };
        return { ...state, items: newItems };
      } else {
        // Add new item if it does not exist
        return {
          ...state,
          items: [...state.items, { ...item, qty: quantityCount }],
        };
      }

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.payload.item.id
            ? {
                ...it,
                pivot: { ...it.pivot, qty: action.payload.quantityCount }, // Safely assume pivot exists or consider adding a check
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
      return { ...state, items: [] }; // Return to initial state for items only

    case ERROR_CART:
      // Optionally log the error or handle it more explicitly
      console.error("Error processing a cart action:", action.payload);
      return state;

    default:
      return state;
  }
};

export default cartReducer;
