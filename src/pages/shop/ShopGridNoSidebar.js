import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// import Paginator from "react-hooks-paginator";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import axiosInstance from "../../api/api";
// import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopProducts from "../../wrappers/product/ShopProducts";
import ShopTopbar from "../../wrappers/product/ShopTopbar";

const ShopGridNoSidebar = ({ location }) => {
  const [layout, setLayout] = useState("grid three-column");
  // const sortType = "";
  // const sortValue = "";
  // const [filterSortType, setFilterSortType] = useState("");
  // const [filterSortValue, setFilterSortValue] = useState("");
  // const [offset, setOffset] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState({ data: [], total: 0 });

  console.log("🚀 ~ ShopGridNoSidebar ~ currentData:", currentData);
  // const [sortedProducts, setSortedProducts] = useState([]);

  // const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    // setFilterSortType(sortType);
    // setFilterSortValue(sortValue);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get("/items");
        if (response.data && response.data.data) {
          setCurrentData(response.data);
        } else {
          // Set to default if response does not contain expected structure
          setCurrentData({ data: [], total: 0 });
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setCurrentData({ data: [], total: 0 });
      }
    };

    fetch();
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Shop Page</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={currentData.data ? currentData.data.length : 0}
                  sortedProductCount={currentData.total || 0}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData.data} />

                {/* shop product pagination */}
                {/* <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridNoSidebar.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ShopGridNoSidebar);
