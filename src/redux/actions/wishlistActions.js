import axiosInstance from "../../api/api";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";
export const WISHLIST_FAILURE = "WISHLIST_FAILURE";
export const WISHLIST_FETCH = "WISHLIST_FETCH";

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return (dispatch) => {
    if (!localStorage.getItem("authToken")) {
      addToast("Must Login", { appearance: "warning", autoDismiss: true });
      return;
    }
    if (addToast) {
      addToast("Added To Wishlist", {
        appearance: "success",
        autoDismiss: true,
      });
    }

    axiosInstance
      .post("/user/update-fav", { item_id: item.item_id || item.id })
      .then((response) => {
        dispatch({
          type: ADD_TO_WISHLIST,
          payload: {
            item,
            message: response.data.message,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: WISHLIST_FAILURE,
          payload: error,
        });
      });
  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed From Wishlist", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    axiosInstance
      .post("/user/update-fav", { item_id: item.item_id || item.id })
      .then((response) => {
        dispatch({
          type: DELETE_FROM_WISHLIST,
          payload: {
            item,
            message: response.data.message,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: WISHLIST_FAILURE,
          payload: error,
        });
      });
  };
};
// get all
export const getWishlist = () => {
  return (dispatch) => {
    axiosInstance
      .get("/user/my-favorites")
      .then((response) => {
        dispatch({
          type: WISHLIST_FETCH,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: WISHLIST_FAILURE,
          payload: error,
        });
      });
  };
};
