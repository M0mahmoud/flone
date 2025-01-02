import React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";

// !DEL
const MenuCart = ({
  cartData,
  deleteFromCart,
  currentLanguageCode,
  strings,
}) => {
  // Correctly calculate the total price using reduce to ensure it's calculated once and not in render method
  const cartTotalPrice = cartData?.items?.reduce((total, item) => {
    return total + (item.price - item.discount) * item.pivot.qty;
  }, 0);

  const { addToast } = useToasts();
  return (
    <div className="shopping-cart-content">
      {cartData && cartData?.items?.length > 0 ? (
        <>
          <ul>
            {cartData?.items?.map((single, key) => {
              const itemTotalPrice =
                (single.price - single.discount) * single.pivot.qty;

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.id}>
                      <img
                        alt={single.name}
                        src={single.image_path}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + single.id}
                      >
                        {currentLanguageCode === "ar"
                          ? single.translations[0]?.name
                          : single.translations[1]?.name}
                      </Link>
                    </h4>
                    <h6>
                      {strings["quantity"]}: {single.pivot.qty}
                    </h6>
                    <span>${itemTotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              {strings["total"]} :{" "}
              <span className="shop-total">{cartTotalPrice.toFixed(2)}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              {strings["view_cart"]}
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              {strings["checkout"]}
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center">{strings["no_items_in_cart"]}</p>
      )}
    </div>
  );
};

export default multilanguage(MenuCart);
