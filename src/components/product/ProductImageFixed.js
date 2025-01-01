import PropTypes from "prop-types";
import React from "react";
// !DEL
const ProductImageFixed = ({ product }) => {
  const originalPrice = product?.price;
  const discountAmount = product?.discount;
  // Calculate discount percentage
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return (
    <div className="product-large-image-wrapper">
      {product?.discount || product?.new ? (
        <div className="product-img-badges">
          {product?.discount ? (
            <span className="pink">-{discountPercentage}%</span>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {product?.image_path ? (
          <img
            src={product?.image_path}
            alt="IMAGEs"
            className="img-fluid"
            loading="lazy"
          />
        ) : (
          ""
        )}
      </div>
      {product?.image_path && (
        <img
          src={product?.cover_path}
          alt="COVER"
          loading="lazy"
          style={{
            marginBlock: "50px",
          }}
        />
      )}
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object,
};

export default ProductImageFixed;
