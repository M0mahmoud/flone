import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import { multilanguage } from "redux-multilanguage";
import Product from "./Product";

const RelatedProductSlider = ({ spaceBottomClass, category, strings }) => {
  const settings = {
    loop: false,
    slidesPerView: 4,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className={`section-title text-center mb-50`}>
          <h2>{strings["Related"]}</h2>
        </div>

        <div className="row">
          <Swiper {...settings}>
            {category.map((product) => (
              <Product product={product} />
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default multilanguage(RelatedProductSlider);
