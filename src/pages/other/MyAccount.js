import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MetaTags from "react-meta-tags";
import { useToasts } from "react-toast-notifications";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
import Loading from "../../components/Loading";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// !DEL
const MyAccount = ({ location, strings }) => {
  const { pathname } = location;
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    addresses: [],
  });
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/edit_profile", user); // Adjust URL as needed
      if (response.status === 200) {
        addToast("User Details Updated", {
          appearance: "success",
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Extract and display validation errors
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(", "); // Combine all error messages into a single string
        addToast(errorMessages, {
          appearance: "error",
        });
      } else {
        addToast("An unexpected error occurred", {
          appearance: "error",
        });
      }
      console.error("Profile update error:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      addToast("Passwords do not match", { appearance: "error" });
      return;
    }

    try {
      const response = await axiosInstance.post("/user/password", {
        password: passwords.password,
      });
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        addToast("Password successfully updated", { appearance: "success" });
        setPasswords({ password: "", confirmPassword: "" });
      } else {
        addToast("Failed to update password", { appearance: "error" });
      }
    } catch (error) {
      addToast("An error occurred while updating the password", {
        appearance: "error",
      });
      console.error("Password update error:", error);
    }
  };

  const handleAddressChange = (index, e) => {
    const updatedAddresses = user.addresses.map((address, i) => {
      if (i === index) {
        return { ...address, [e.target.name]: e.target.value };
      }
      return address;
    });
    setUser({ ...user, addresses: updatedAddresses });
  };

  const handleAddressSubmit = async (index, e) => {
    e.preventDefault();
    const address = user.addresses[index];
    try {
      const response = await axiosInstance.post(
        `/user/addresses/edit/${address.id}`,
        address
      );
      if (response.status === 200) {
        addToast("Address updated successfully", { appearance: "success" });
      }
    } catch (error) {
      console.error("Failed to update address:", error);
      addToast("Failed to update address", { appearance: "error" });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <MetaTags>
        <title>
          {strings["Zain"]} | {strings["my_account"]}
        </title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["my_account"]}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> {strings["edit_account_info"]}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <form
                            onSubmit={handleSubmit}
                            className="myaccount-info-wrapper"
                          >
                            <div className="account-info-wrapper">
                              <h4>{strings["account_info"]}</h4>
                              <h5>{strings["personal_details"]}</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>{strings["first_name"]}</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    value={user.fname || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>{strings["last_name"]}</label>
                                  <input
                                    type="text"
                                    name="lname"
                                    value={user.lname || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>{strings["email_address"]}</label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={user.email || ""}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>{strings["telephone"]}</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    value={user.phone || ""}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">
                                  {strings["update"]}
                                </button>
                              </div>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> {strings["change_password"]}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <form
                            onSubmit={handlePasswordSubmit}
                            className="myaccount-info-wrapper"
                          >
                            <div className="account-info-wrapper">
                              <h4>{strings["change_password"]}</h4>
                              <h5>{strings["password"]}</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>{strings["password"]}</label>

                                  <input
                                    type="password"
                                    name="password"
                                    value={passwords.password}
                                    onChange={handlePasswordChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>{strings["password_confirm"]}</label>
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handlePasswordChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">
                                  {strings["continue"]}
                                </button>
                              </div>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> {strings["modify_address_book"]}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>{strings["address_book_entries"]}</h4>
                            </div>
                            {user?.addresses?.map((address, index) => (
                              <>
                                <p>
                                  <span>{index + 1} .</span> Address {index + 1}
                                </p>
                                <form
                                  onSubmit={(e) =>
                                    handleAddressSubmit(index, e)
                                  }
                                >
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>{strings["first_name"]}</label>
                                        <input
                                          type="text"
                                          name="f_name"
                                          value={address.f_name}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
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
                                          value={address.l_name}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
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
                                          value={address.country}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>
                                          {strings["street_address"]}
                                        </label>
                                        <input
                                          placeholder={
                                            strings["apartment_suite"]
                                          }
                                          type="text"
                                          name="street"
                                          value={address.street}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
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
                                          value={address.city}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
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
                                          value={address.zip}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
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
                                          value={address.phone}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>
                                          {strings["email_address"]}
                                        </label>
                                        <input
                                          type="text"
                                          name="email"
                                          value={address.email}
                                          onChange={(e) =>
                                            handleAddressChange(index, e)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <button type="submit" className="btn">
                                    {strings["update"]}
                                  </button>
                                </form>
                              </>
                            ))}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default multilanguage(MyAccount);
