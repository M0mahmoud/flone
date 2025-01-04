import axiosInstance from "../../api/api";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";
export const WISHLIST_FAILURE = "WISHLIST_FAILURE";
export const WISHLIST_FETCH = "WISHLIST_FETCH";

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        item,
      },
    });

    if (addToast) {
      addToast("Added To Wishlist", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    if (localStorage.getItem("authToken")) {
      axiosInstance
        .post("/user/update-fav", { item_id: item.item_id || item.id })
        .then(() => {})
        .catch((error) => {
          dispatch({
            type: WISHLIST_FAILURE,
            payload: error,
          });
        });
    }
  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_FROM_WISHLIST,
      payload: {
        item,
      },
    });
    if (addToast) {
      addToast("Removed From Wishlist", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (localStorage.getItem("authToken")) {
      axiosInstance
        .post("/user/update-fav", { item_id: item.item_id || item.id })
        .then(() => {})
        .catch((error) => {
          dispatch({
            type: WISHLIST_FAILURE,
            payload: error,
          });
        });
    }
  };
};
// get all
export const getWishlist = () => {
  return (dispatch) => {
    if (!localStorage.getItem("authToken")) {
      // Assuming that the wishlist in local storage is stored under a key like 'localWishlist'
      const localWishlist = localStorage.getItem("redux_localstorage_simple");
      let wishlist =
        JSON.parse(localStorage.getItem("localWishlist")).wishlistData || [];

      if (localWishlist) {
        dispatch({
          type: WISHLIST_FETCH,
          payload: wishlist,
        });
      } else {
        dispatch({
          type: WISHLIST_FAILURE,
          payload: "No wishlist data found in local storage.",
        });
      }
    } else {
      axiosInstance
        .get("/user/my-favorites")
        .then((response) => {
          const items = response.data.map((favorite) => favorite.item); // Extract the 'item' objects
          dispatch({
            type: WISHLIST_FETCH,
            payload: items,
          });
        })
        .catch((error) => {
          dispatch({
            type: WISHLIST_FAILURE,
            payload: error,
          });
        });
    }
  };
};
