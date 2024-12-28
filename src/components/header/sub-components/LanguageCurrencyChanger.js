import PropTypes from "prop-types";
import React from "react";
import { changeLanguage } from "redux-multilanguage";
// !DEL
const LanguageCurrencyChanger = ({ currentLanguageCode, dispatch }) => {
  console.log(
    "🚀 ~ LanguageCurrencyChanger ~ currentLanguageCode:",
    currentLanguageCode
  );
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "en" ? "English" : "Arabic"}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={(e) => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="ar" onClick={(e) => changeLanguageTrigger(e)}>
                Arabic
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>Call Us 3965410</p>
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
