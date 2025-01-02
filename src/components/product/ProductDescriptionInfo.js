import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import CheckoutModal from "./CheckoutModal";
// import Rating from "./sub-components/ProductRating";
// !DEL
const ProductDescriptionInfo = ({
  product,
  addToCart,
  currentLanguageCode,
  strings,
}) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(product?.is_favorite);
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState(false);

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
    <>
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
                  onClick={() => addToCart(product, addToast, quantityCount)}
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
        <div className="">
          <button className="order-now" onClick={() => setModalShow(true)}>
            <span>{strings["order_now"]}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              viewBox="0 0 24 24"
              fill="#FFF"
            >
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </button>
        </div>
      </div>
      <CheckoutModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currentLanguageCode={currentLanguageCode}
        strings={strings}
        quantityCount={quantityCount}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(multilanguage(ProductDescriptionInfo));
