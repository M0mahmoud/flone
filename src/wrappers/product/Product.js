import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [isFav, setIsFav] = useState(product.is_favorite);
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
  const originalPrice = product.price;
  const discountAmount = product.discount;
  // Calculate discount percentage
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return (
    <div key={product.id} className="col-xl-3 col-md-6 col-lg-4 col-sm-6">
      <div className="product-wrap-2 mb-25">
        {/* Product Image */}
        <div className="product-img">
          <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
            <img
              className="default-img"
              src={product.image_path}
              alt={product.name}
              loading="lazy"
              width={270}
              height={270}
            />
            {product.discount ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{discountPercentage}%</span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {product.image && (
              <img
                className="hover-img"
                src={product.image_path}
                alt={product.name}
                loading="lazy"
                width={270}
                height={270}
              />
            )}
          </Link>
          {product.promotion ? (
            <div className="product-img-badges">
              <span className="pink">-{product.promotion}%</span>
            </div>
          ) : null}
        </div>
        {/* Product Content */}
        <div className="product-content-2">
          {/* Title and Price */}
          <div className="title-price-wrap-2">
            <h3>
              <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            <div className="price-2">
              {product.price > 0 ? (
                <span>${product.price}</span>
              ) : (
                <span>Contact for price</span>
              )}
            </div>
          </div>

          {/* Wishlist */}
          <div className="pro-wishlist-2">
            <button
              className={product.is_favorite ? "active" : ""}
              onClick={handleWishlistToggle}
              title={
                product.is_favorite ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <i className={isFav ? "fa fa-heart" : "fa fa-heart-o"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
