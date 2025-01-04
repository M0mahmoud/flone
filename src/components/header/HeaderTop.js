import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import { setCurrency } from "../../redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle,
  strings,
}) => {
  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      <LanguageCurrencyChanger
        currency={currency}
        setCurrency={setCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
        strings={strings}
      />
      <div className="header-offer ">
        <p>
          {strings["free"]} <span>{200}</span>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currencyName) => {
      dispatch(setCurrency(currencyName));
    },
  };
};
// !DEL
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
