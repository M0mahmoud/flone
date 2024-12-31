import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/api";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
// import ProductGridTwo from "./ProductGridTwo";
// !DEL
const TabProductFour = ({ spaceBottomClass, productTabClass }) => {
  const [activeTab, setActiveTab] = useState("bestSeller"); // Default active tab
  const [productsData, setProductsData] = useState({
    newArrival: [],
    bestSeller: [],
    saleItems: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data at once
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [newItems, bestItems, saleItems] = await Promise.all([
          axiosInstance.get("/new-items"),
          axiosInstance.get("/best-items"),
          axiosInstance.get("/sale-items"),
        ]);

        setProductsData({
          newArrival: newItems.data || [],
          bestSeller: bestItems.data || [],
          saleItems: saleItems.data || [],
        });
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductsData({
          newArrival: [],
          bestSeller: [],
          saleItems: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Use the activeTab to display the corresponding data
  const products = productsData[activeTab] || [];
  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitleThree
          titleText="Featured Product"
          positionClass="text-center"
        />
        <Tab.Container
          defaultActiveKey="bestSeller"
          onSelect={(key) => setActiveTab(key)} // Update active tab
        >
          <Nav
            variant="pills"
            className={`product-tab-list pt-35 pb-60 text-center ${
              productTabClass ? productTabClass : ""
            }`}
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            {loading && (
              <div className="loading-spinner">
                <p>Loading...</p>
              </div>
            )}
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                {products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                {products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                {products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link className="loadMore6" to={process.env.PUBLIC_URL + "/shop"}>
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductFour.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default TabProductFour;

const Product = ({ product }) => (
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
            title={
              product.is_favorite ? "Added to wishlist" : "Add to wishlist"
            }
          >
            <i className="fa fa-heart-o" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
