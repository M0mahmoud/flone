import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";
import { getIsFavoriteFromLocalStorage } from "../../helpers/Locale";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import ProductModal from "./ProductModal";
// !DEL // PRODUCTCARD
const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  sliderClassName,
  spaceBottomClass,
  currentLanguageCode,
  addToCart,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
  const [isFav, setIsFav] = useState(
    product.is_favorite || getIsFavoriteFromLocalStorage(product)
  );
  const dispatch = useDispatch();
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
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={process.env.PUBLIC_URL + product.image_path}
                alt={product.name}
                loading="lazy"
                width={360}
                height={360}
              />
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

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
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
              <div className="pro-same-action pro-cart">
                {product.is_available ? (
                  <button
                    onClick={() => addToCart(product, addToast, 1)}
                    className={
                      cartItem !== undefined && cartItem?.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem?.quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem?.quantity > 0
                      ? "Added"
                      : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {currentLanguageCode === "ar"
                  ? product.translations[0]?.name
                  : product.translations[1]?.name}
              </Link>
            </h3>

            <div className="product-price">
              {product.price !== null ? (
                <Fragment>
                  <span>{product.price}</span>{" "}
                  {/* <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                    </span> */}
                </Fragment>
              ) : (
                <span>{product.price} </span>
              )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    <img
                      className="default-img"
                      src={process.env.PUBLIC_URL + product.image_path}
                      alt={
                        currentLanguageCode === "ar"
                          ? product.translations[0]?.name
                          : product.translations[1]?.name
                      }
                      loading="lazy"
                      width={360}
                      height={360}
                    />
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
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content d-flex flex-column justify-content-between align-items-start h-100 pb-4">
                <h3>
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    {currentLanguageCode === "ar"
                      ? product.translations[0]?.name
                      : product.translations[1]?.name}
                  </Link>
                </h3>
                <div className="product-list-price">
                  {/* {discountedPrice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol + finalDiscountedPrice}
                      </span>{" "}
                      <span className="old">
                        {currency.currencySymbol + finalProductPrice}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + finalProductPrice} </span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.shortDescription ? (
                  <p>{product.shortDescription}</p>
                ) : (
                  ""
                )} */}

                  <div className="shop-list-actions d-flex align-items-center">
                    <div className="shop-list-btn btn-hover">
                      {product.is_available ? (
                        <button
                          onClick={() => addToCart(product, addToast, 1)}
                          className={
                            cartItem !== undefined && cartItem?.quantity > 0
                              ? "active"
                              : ""
                          }
                          disabled={
                            cartItem !== undefined && cartItem?.quantity > 0
                          }
                          title={
                            cartItem !== undefined
                              ? "Added to cart"
                              : "Add to cart"
                          }
                        >
                          {" "}
                          <i className="pe-7s-cart"></i>{" "}
                          {cartItem !== undefined && cartItem?.quantity > 0
                            ? "Added"
                            : "Add to cart"}
                        </button>
                      ) : (
                        <button disabled className="active">
                          Out of Stock
                        </button>
                      )}
                    </div>

                    <div className="shop-list-wishlist ml-10">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        // discountedprice={discountedPrice}
        // finalproductprice={finalProductPrice}
        // finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        addtowishlist={addToWishlist}
        addtoast={addToast}
        addToCart={addToCart}
      />
    </Fragment>
  );
};

export default multilanguage(ProductGridListSingle);
