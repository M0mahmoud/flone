import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Paginator from "react-hooks-paginator";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopProducts from "../../wrappers/product/ShopProducts";
import ShopTopbar from "../../wrappers/product/ShopTopbar";

const ShopGridNoSidebar = ({ location, strings }) => {
  const [layout, setLayout] = useState("grid three-column");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [allData, setAllData] = useState([]); // Store all data fetched from API
  const pageLimit = 20;
  const [offset, setOffset] = useState((currentPage - 1) * pageLimit);

  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/items", {
          params: { sort: filterSortValue },
        });
        if (response.data && Array.isArray(response.data)) {
          setAllData(response.data);
          // Implement slicing to mimic pagination
          setCurrentData(response.data.slice(offset, offset + pageLimit));
        } else {
          setAllData([]);
          setCurrentData([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setAllData([]);
        setCurrentData([]);
      }
    };

    fetchItems();
  }, [filterSortValue, setCurrentData, currentPage, offset]);
  useEffect(() => {
    // Update currentData based on currentPage
    setCurrentData(allData.slice(offset, offset + pageLimit));
  }, [currentPage, allData, offset]);

  return (
    <Fragment>
      <MetaTags>
        <title>{strings["shop"]}</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["shop"]}
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* shop topbar */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={setFilterSortValue}
                  productCount={allData ? allData?.length : 0}
                  sortedProductCount={currentData?.length || 0}
                />

                <ShopProducts layout={layout} products={currentData} />

                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={allData.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
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

export default connect()(multilanguage(ShopGridNoSidebar));
