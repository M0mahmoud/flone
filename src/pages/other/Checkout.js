import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MetaTags from "react-meta-tags";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
import Loading from "../../components/Loading";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// !DEL
const Checkout = ({ location, strings, currentLanguageCode }) => {
  const { pathname } = location;
  const { addToast } = useToasts();
  const { items: cartItems, loading } = useSelector((state) => state.cartData);
  const [newAddressForm, setNewAddressForm] = useState({});
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("cod");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUser(response.data.user);
        setAddresses(response.data.user.addresses);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, []);
  const cartTotalPrice = cartItems?.reduce((total, item) => {
    return total + (item.price - item.discount) * item.pivot.qty;
  }, 0);
  const handleAddressSelect = (value) => {
    const numericValue = parseInt(value, 10); // Convert value to integer if it's numeric
    console.log("Selected Address ID:", numericValue); // This will log the value to the console
    setSelectedAddress(numericValue);
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      addToast(strings["address_required"], { appearance: "error" });
      return;
    }

    const checkoutData = {
      address_id: selectedAddress,
      type,
      notes: notes,
    };

    try {
      await axiosInstance.post("/checkout", checkoutData);
      // Handle successful checkout response
      addToast(strings["order_placed"], { appearance: "success" });
    } catch (error) {
      console.error("Checkout failed:", error);
      addToast(strings["checkout_failed"], { appearance: "error" });
    }
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/user/addresses/add",
        newAddressForm
      );
      if (response.data.status === "success") {
        setAddresses([...addresses, response.data.address]);
        setSelectedAddress(response.data.address.id);
        addToast(strings["address_added_success"], { appearance: "success" });
      }
    } catch (error) {
      console.error("Failed to add new address:", error);
      addToast(strings["address_add_failed"], { appearance: "error" });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["checkout"]}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            <div className="col-lg-12">
              <div className="billing-info mb-20"></div>
            </div>
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>{strings["billing_details"]}</h3>
                    {addresses.length > 0 ? (
                      addresses.map((address) => (
                        <div className="address-item" key={address.id}>
                          <input
                            type="radio"
                            name="address_id"
                            id={`address-${address.id}`}
                            className="address-radio"
                            value={address.id}
                            onChange={(e) =>
                              handleAddressSelect(e.target.value)
                            }
                            checked={selectedAddress === address.id}
                          />
                          <label
                            htmlFor={`address-${address.id}`}
                            className="address-label"
                          >
                            {address.f_name} {address.l_name} - {address.street}
                            , {address.city}, {address.country}
                          </label>
                        </div>
                      ))
                    ) : (
                      <form onSubmit={handleAddNewAddress}>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["first_name"]}</label>
                              <input
                                type="text"
                                name="f_name"
                                value={newAddressForm.f_name}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["last_name"]}</label>
                              <input
                                type="text"
                                name="l_name"
                                value={newAddressForm.l_name}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["country"]}</label>
                              <input
                                type="text"
                                name="country"
                                value={newAddressForm.country}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["street_address"]}</label>
                              <input
                                placeholder={strings["apartment_suite"]}
                                type="text"
                                name="street"
                                value={newAddressForm.street}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["town_city"]}</label>
                              <input
                                type="text"
                                name="city"
                                value={newAddressForm.city}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["postcode_zip"]}</label>
                              <input
                                type="text"
                                name="zip"
                                value={newAddressForm.zip}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["phone"]}</label>
                              <input
                                type="text"
                                name="phone"
                                value={newAddressForm.phone}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>{strings["email_address"]}</label>
                              <input
                                type="text"
                                name="email"
                                value={newAddressForm.email}
                                onChange={(e) =>
                                  setNewAddressForm(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <button className="btn" type="submit">
                          Submit address
                        </button>
                      </form>
                    )}

                    <div className="additional-info-wrap">
                      <h4>{strings["additional_information"]}</h4>
                      <div className="additional-info">
                        <label>{strings["order_notes"]}</label>
                        <textarea
                          placeholder={strings["notes_placeholder"]}
                          name="message"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>{strings["your_order"]}</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>{strings["product"]}</li>
                            <li>{strings["total"]}</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {currentLanguageCode === "ar"
                                      ? cartItem.translations[0]?.name
                                      : cartItem.translations[1]?.name}{" "}
                                    X {cartItem.pivot.qty}
                                  </span>{" "}
                                  <span className="order-price">
                                    {(
                                      (cartItem.price - cartItem?.discount) *
                                      cartItem.pivot.qty
                                    ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">
                              {strings["shipping"]}
                            </li>
                            <li>{strings["free_shipping"]}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">{strings["total"]}</li>
                            <li>{cartTotalPrice.toFixed(2)}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover mb-3"
                        onClick={() => {
                          setType("points");
                          handleCheckout();
                        }}
                        disabled={user?.points < cartTotalPrice}
                        style={{
                          display:
                            user?.points < cartTotalPrice ? "none" : "block",
                        }}
                        id="points-button"
                      >
                        {strings["place_order_with_points"]}
                      </button>
                      <button
                        className="btn-hover"
                        onClick={() => {
                          setType("cod");
                          handleCheckout();
                        }}
                        id="cod-button"
                      >
                        {strings["place_order_with_cod"]}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      {strings["no_items_in_cart"]} <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        {strings["shop_now"]}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(multilanguage(Checkout));
