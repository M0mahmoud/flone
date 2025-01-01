// import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
// !DEL
function CheckoutModal({
  product,
  currentLanguageCode,
  show,
  onHide,
  strings,
}) {
  const [deliveryFees, setDeliveryFees] = useState("");
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zip: "",
    street: "",
    notes: "",
  });
  useEffect(() => {
    axiosInstance
      .get("/settings")
      .then((res) => setDeliveryFees(res?.data?.settings?.delivery_fees))
      .catch(() => setDeliveryFees(""));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for the checkout API request
    const checkoutData = {
      product_id: product.id,
      price: product.price,
      delivery_fees: deliveryFees,
      full_name: `${formData.fName} ${formData.lName}`,
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      city: formData.city,
      zip: formData.zip,
      street: formData.street,
      notes: formData.notes,
      type: "cod",
    };

    try {
      const response = await axiosInstance.post("/checkout", checkoutData);
      if (response.data.status === "success") {
        // Handle success (e.g., show a success message, close modal, etc.)
        alert("Checkout successful!");
        onHide(); // Close the modal
      }
    } catch (error) {
      // Handle errors (e.g., validation errors, network issues)
      console.error("Checkout failed", error);
      alert("Checkout failed. Please try again.");
    }
  };
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        className="product-quickview-modal-wrapper"
        style={{
          direction: currentLanguageCode === "en" ? "ltr" : "rtl",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{strings["checkout_title"]}</Modal.Title>
        </Modal.Header>
        <div className="modal-body p-0">
          <form>
            <Modal.Body className="p-0">
              <div className="checkout-modal-content p-3">
                {/* Contact Information */}
                <div className="mb-4">
                  <p className="fw-bold mb-3">{strings["contact_info"]}</p>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="fName"
                      value={formData.fName}
                      onChange={handleInputChange}
                      placeholder={strings["first_name"]}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="lName"
                      value={formData.lName}
                      onChange={handleInputChange}
                      placeholder={strings["last_name"]}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={strings["email_optional"]}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={strings["phone"]}
                    />
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="mb-4">
                  <p className="fw-bold mb-3">{strings["shipping_info"]}</p>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder={strings["street"]}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder={strings["country"]}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder={strings["city"]}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder={strings["zip_code"]}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder={strings["notes"]}
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                <div>
                  <p className="fw-bold mb-3">{strings["shipping_cost"]}</p>
                  <div className="d-flex justify-content-between">
                    <span>{strings["shipping_price"]}</span>
                    <span>LE {deliveryFees || "49.00"}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>{strings["total"]}</span>
                    <span>
                      LE{" "}
                      {parseFloat(product.price) +
                        parseFloat(deliveryFees || 0)}
                    </span>
                  </div>
                  <p className="text-muted mt-1">{strings["tax_included"]}</p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-column gap-2">
              <button className="btn btn-primary w-100">
                {strings["pay_on_delivery"]}
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}

export default multilanguage(CheckoutModal);
