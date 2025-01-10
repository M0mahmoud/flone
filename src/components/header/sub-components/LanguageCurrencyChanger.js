import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { changeLanguage } from "redux-multilanguage";
import axiosInstance from "../../../api/api";
// !DEL
const LanguageCurrencyChanger = ({
  currentLanguageCode,
  dispatch,
  strings,
}) => {
  const [footer, setFooter] = useState();
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
    window.location.reload();
  };
  useEffect(() => {
    axiosInstance
      .get("/settings")
      .then((res) => setFooter(res.data?.mobiles[0].mobile))
      .catch(() => setFooter({}));
  }, []);

  return (
    <div className="language-currency-wrap d-none d-lg-flex">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "en" ? "English" : "Arabic"}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={(e) => changeLanguageTrigger(e)}>
                {strings["en"]}
              </button>
            </li>
            <li>
              <button value="ar" onClick={(e) => changeLanguageTrigger(e)}>
                {strings["ar"]}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>
          {strings["call_us"]} {footer}
        </p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

export default LanguageCurrencyChanger;
