import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";
import { getIsFavoriteFromLocalStorage } from "../../helpers/Locale";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";

const Product = ({ product, currentLanguageCode, strings }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [isFav, setIsFav] = useState(
    product.is_favorite || getIsFavoriteFromLocalStorage(product)
  );
  const handleWishlistToggle = () => {
    if (isFav) {
      // Remove from wishlist if it is already favorited
      dispatch(deleteFromWishlist(product, addToast));
      setIsFav((prev) => !prev);
    } else {
      // Add to wishlist if it is not yet favorited
      dispatch(addToWishlist(product, addToast));
      setIsFav((prev) => !prev);
    }
  };

  return (
    <div
      className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 col-12 `}
      style={{
        direction: currentLanguageCode === "en" ? "ltr" : "rtl",
        textAlign: "start !important",
      }}
    >
      <div className={`product-wrap-2 mb-25`}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            <img
              className="default-img img-fluid"
              src={product.image_path}
              alt={product.name}
              loading="lazy"
            />
            {product.image.length > 1 ? (
              <img
                className="hover-img img-fluid"
                src={product.image_path}
                alt={product.name}
                loading="lazy"
              />
            ) : (
              ""
            )}
          </Link>
          {product.discount ? (
            <div className="product-img-badges">
              <span className="pink" style={{ color: "#FFF" }}>
                -{product.discount}%
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="product-action-2">
            {product.is_available ? (
              <button
                onClick={() => dispatch(addToCart(product, addToast, 1))}
                title={!product.is_available ? "Added to cart" : "Add to cart"}
              >
                {" "}
                <i className="fa fa-shopping-cart"></i>{" "}
              </button>
            ) : (
              <button disabled className="active" title="Out of stock">
                <i className="fa fa-shopping-cart"></i>
              </button>
            )}
            <button
              className={
                product.is_favorite || getIsFavoriteFromLocalStorage(product)
                  ? "active"
                  : ""
              }
              onClick={handleWishlistToggle}
              title={
                product.is_favorite || getIsFavoriteFromLocalStorage(product)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <i className={isFav ? "fa fa-heart" : "fa fa-heart-o"} />
            </button>
          </div>
        </div>
        <div className="product-content-2">
          <div className="title-price-wrap-2">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {currentLanguageCode === "ar"
                  ? product.translations[0]?.name
                  : product.translations[1]?.name}
              </Link>
            </h3>
            <div className="product-details-price">
              {product?.discount > 0 ? (
                <>
                  <span
                    className="new"
                    style={{
                      direction: currentLanguageCode === "en" ? "ltr" : "rtl",
                      color: "red",
                    }}
                  >
                    {product?.price -
                      (product?.price * product?.discount) / 100}{" "}
                    {/* Calculate new price */}
                  </span>
                  {"  "}
                  {strings["EG"]}
                  {/* New price after discount */}
                  <span
                    className="old"
                    style={{
                      direction: currentLanguageCode === "en" ? "ltr" : "rtl",
                      textDecoration: "line-through",
                    }}
                  >
                    {product?.price}
                    {strings["EG"]}
                  </span>
                </>
              ) : (
                <span
                  style={{
                    direction: currentLanguageCode === "en" ? "ltr" : "rtl",
                  }}
                >
                  {product?.price}
                  {strings["EG"]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(multilanguage(Product));
