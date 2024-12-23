import PropTypes from "prop-types";
import React, { Suspense, lazy, useEffect } from "react";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { loadLanguages, multilanguage } from "redux-multilanguage";
import ScrollToTop from "./helpers/scroll-top";

// home pages
const HomeOrganicFood = lazy(() => import("./pages/home/HomeOrganicFood"));

// shop pages
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));

// product pages
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/en.json"),
          ar: require("./translations/ar.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* Homepages */}
                <Route exact path={"/"} component={HomeOrganicFood} />

                {/* Shop pages */}
                <Route path={"/shop"} component={ShopGridNoSidebar} />

                {/* Shop product pages */}
                <Route path={"/product/:id"} component={ProductFixedImage} />

                {/* Other pages */}
                <Route path={"/about"} component={About} />
                <Route path={"/contact"} component={Contact} />
                <Route path={"/my-account"} component={MyAccount} />
                <Route path={"/login-register"} component={LoginRegister} />

                <Route path={"/cart"} component={Cart} />
                <Route path={"/wishlist"} component={Wishlist} />
                <Route path={"/checkout"} component={Checkout} />

                <Route path={"/not-found"} component={NotFound} />

                {/* Default fallback for unmatched routes */}
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
