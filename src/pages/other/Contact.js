import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import MetaTags from "react-meta-tags";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
import LocationMap from "../../components/contact/LocationMap";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Contact = ({ strings }) => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactFormErrors, setContactFormErrors] = useState({});
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContactFormErrors({});
    setSubmitting(true);

    try {
      const response = await axiosInstance.post("/contact", contactFormData);
      if (response.data.status === "success") {
        setContactFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setContact("Message Sent Successfully");
      } else if (response.data.status === "error") {
        setContactFormErrors(response.data.errors);
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | {strings["CONTACT_pageTitle"]}</title>
        <meta
          name="description"
          content="Contact of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/contact"}>
        {strings["CONTACT"]}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="47.444" longitude="-122.176" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>{strings["CONTACT_PHONE_PRIMARY"]}</p>
                      <p>{strings["CONTACT_PHONE_SECONDARY"]}</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href={`mailto:${strings["CONTACT_EMAIL_ADDRESS"]}`}>
                          {strings["CONTACT_EMAIL_ADDRESS"]}
                        </a>
                      </p>
                      <p>
                        <a href={`//${strings["CONTACT_EMAIL_WEBSITE"]}`}>
                          {strings["CONTACT_EMAIL_WEBSITE"]}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>{strings["CONTACT_ADDRESS_LINE1"]}</p>
                      <p>{strings["CONTACT_ADDRESS_LINE2"]}</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>{strings["CONTACT_SOCIAL_TITLE"]}</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>{strings["CONTACT_FORM_TITLE"]}</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="name"
                          placeholder={strings["CONTACT_FORM_NAME_PLACEHOLDER"]}
                          type="text"
                          value={contactFormData.name}
                          onChange={handleInputChange}
                        />
                        {contactFormErrors.name && (
                          <span className="error">
                            {contactFormErrors.name[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <input
                          name="email"
                          placeholder={
                            strings["CONTACT_FORM_EMAIL_PLACEHOLDER"]
                          }
                          type="email"
                          value={contactFormData.email}
                          onChange={handleInputChange}
                        />
                        {contactFormErrors.email && (
                          <span className="error">
                            {contactFormErrors.email[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder={
                            strings["CONTACT_FORM_SUBJECT_PLACEHOLDER"]
                          }
                          type="text"
                          value={contactFormData.subject}
                          onChange={handleInputChange}
                        />
                        {contactFormErrors.subject && (
                          <span className="error">
                            {contactFormErrors.subject[0]}
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder={
                            strings["CONTACT_FORM_MESSAGE_PLACEHOLDER"]
                          }
                          value={contactFormData.message}
                          onChange={handleInputChange}
                        />
                        {contactFormErrors.message && (
                          <span className="error">
                            {contactFormErrors.message[0]}
                          </span>
                        )}
                        {contact && (
                          <p style={{ color: "green", paddingBlock: "10px" }}>
                            {contact}
                          </p>
                        )}
                        <button
                          className="submit"
                          type="submit"
                          disabled={submitting}
                        >
                          {strings["CONTACT_FORM_SUBMIT_BUTTON"]}
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default multilanguage(Contact);
