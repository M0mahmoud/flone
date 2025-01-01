import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import axiosInstance from "../../api/api";
import LayoutOne from "../../layouts/LayoutOne";

import { multilanguage } from "redux-multilanguage";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
// !DEL
const ProductFixedImage = ({ location, currentLanguageCode, strings }) => {
  const [product, setProduct] = useState(null);
  const [RelatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pathname } = location;
  const PRODUCT_ID = pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset errors
      try {
        const response = await axiosInstance.get(`/item/${PRODUCT_ID}`);
        setProduct(response.data.item);
        setRelatedProduct(response.data.related);
        setLoading(false); // Stop loading once data is received
      } catch (error) {
        console.error("Failed to fetch product", error);
        setError("Failed to load product"); // Set error message
        setLoading(false); // Stop loading on error
      }
    };

    fetchProduct();
  }, [PRODUCT_ID]);

  if (loading) {
    return (
      <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error state
  }

  if (!product) {
    return <div>No product found.</div>; // Display if no product is found
  }
  return (
    <Fragment>
      <MetaTags>
        <title>
          {" "}
          {!loading && currentLanguageCode === "ar"
            ? product?.translations[0]?.name
            : product?.translations[1]?.name || ""}
        </title>
        <meta
          name="description"
          content={
            !loading && currentLanguageCode === "ar"
              ? product?.translations[0]?.description
              : product?.translations[1]?.description || ""
          }
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["shopProduct"]}
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="fixedImage"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={
            currentLanguageCode === "ar"
              ? product?.translations[0]?.description
              : product?.translations[1]?.description
          }
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={RelatedProduct}
        />
      </LayoutOne>
    </Fragment>
  );
};

ProductFixedImage.propTypes = {
  location: PropTypes.object,
};

export default connect()(multilanguage(ProductFixedImage));
