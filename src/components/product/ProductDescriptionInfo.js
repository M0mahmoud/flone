import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";
// import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
// import Rating from "./sub-components/ProductRating";
// !DEL
const ProductDescriptionInfo = ({
  product,
  cartItems,
  addToCart,
  currentLanguageCode,
  strings,
}) => {
  const [selectedProductSize] = useState("");
  const [quantityCount, setQuantityCount] = useState(1);
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(product?.is_favorite);
  const { addToast } = useToasts();

  const handleWishlistToggle = () => {
    if (isFav) {
      dispatch(deleteFromWishlist(product, addToast));
      setIsFav((prev) => !prev);
    } else {
      dispatch(addToWishlist(product, addToast));
      setIsFav((prev) => !prev);
    }
  };

  return (
    <div className="product-details-content ml-70">
      <h2>
        {currentLanguageCode === "ar"
          ? product.translations[0]?.name
          : product.translations[1].name}
      </h2>
      <div className="product-details-price">
        {product?.discount > 0 ? (
          <>
            <span className="new">${product?.price - product?.discount}</span>{" "}
            {/* New price after discount */}
            <span className="old">${product?.price}</span> {/* Old price */}
          </>
        ) : (
          <span>${product?.price}</span>
        )}
      </div>

      <div className="pro-details-list">
        <p>
          <span>{strings["weight"]} </span>
          {currentLanguageCode === "ar"
            ? product.translations[0]?.weight
            : product.translations[1].weight}
        </p>
        <p>
          <span>{strings["country"]} </span>
          {currentLanguageCode === "ar"
            ? product.translations[0]?.country_origin
            : product.translations[1].country_origin}
        </p>
      </div>

      <div className="pro-details-size-color">
        <div className="pro-details-size">
          {/* <div className="pro-details-size-content">
              {/* {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })} 
            </div> */}
        </div>
      </div>
      {product.is_available && (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              type="button"
              onClick={() => setQuantityCount(quantityCount - 1)} // Directly increment the quantity
              disabled={quantityCount === 1}
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              type="button"
              onClick={() => setQuantityCount(quantityCount + 1)} // Directly increment the quantity
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {product.is_available ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductSize
                  )
                }
                disabled={!product.is_available}
              >
                {strings["addToCart"]}
              </button>
            ) : (
              <button disabled>{strings["outOfStock"]}</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={!isFav ? "active" : ""}
              title={!isFav ? "Added to wishlist" : "Add to wishlist"}
              onClick={() => handleWishlistToggle()}
            >
              <i
                className={isFav ? "fa fa-heart" : "fa fa-heart-o"}
                style={{
                  color: isFav ? "red" : "inherit",
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(multilanguage(ProductDescriptionInfo));
