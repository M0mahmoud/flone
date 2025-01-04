import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCart, getCartItems } from "../../redux/actions/cartActions";
import { getWishlist } from "../../redux/actions/wishlistActions";
import MenuCart from "./sub-components/MenuCart";

// !DEL
const IconGroup = ({
  cartData,
  wishlistData,
  deleteFromCart,
  iconWhiteClass,
}) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>

      <div className="same-style header-wishlist">
        <Link
          to={
            process.env.PUBLIC_URL +
            `${
              localStorage.getItem("authToken")
                ? "/my-account"
                : "/login-register"
            }`
          }
        >
          <i className="pe-7s-user-female" />
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData?.items?.length ? cartData?.items?.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart cartData={cartData} deleteFromCart={deleteFromCart} />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData?.items?.length ? cartData?.items?.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartData: state.cartData,
    wishlistData: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    getWishlist: () => {
      dispatch(getWishlist());
    },
    getCartItems: () => {
      dispatch(getCartItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
