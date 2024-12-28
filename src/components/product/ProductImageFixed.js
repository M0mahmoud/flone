import PropTypes from "prop-types";
import React from "react";
// !DEL
const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {/* {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )} */}

      <div className="product-fixed-image">
        {product.image_path ? (
          <img
            src={product.image_path}
            alt="IMAGEs"
            className="img-fluid"
            loading="lazy"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object,
};

export default ProductImageFixed;
