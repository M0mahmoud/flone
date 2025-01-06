import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
// !DEL
const Logo = ({ currentLanguageCode, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img
          alt=""
          src={`${
            currentLanguageCode === "en"
              ? "/zein322 -01.svg"
              : "/zein322 -11.svg"
          }`}
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
        />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default multilanguage(Logo);
