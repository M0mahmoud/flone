import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import axiosInstance from "../../api/api";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
// !DEL
const ProductFixedImage = ({ location, currentLanguageCode }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pathname } = location;
  const PRODUCT_ID = pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/item/${PRODUCT_ID}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
        // Optionally handle the error state
      }
    };

    fetchProduct();
  }, [PRODUCT_ID]);
  useEffect(() => {
    setLoading(true); // Start loading
    setError(null); // Reset errors
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/item/${PRODUCT_ID}`);
        setProduct(response.data);
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
        <title>Flone | Product Page</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
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
              ? product.translations[0].description
              : product.translations[1].description
          }
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

ProductFixedImage.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
    currentLanguageCode: state.multilanguage.currentLanguageCode,
  };
};

export default connect(mapStateToProps)(ProductFixedImage);
