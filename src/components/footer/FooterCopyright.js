import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const FooterCopyright = ({
  currentLanguageCode,
  spaceBottomClass,
  colorClass,
  strings,
}) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}
    >
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img
            alt=""
            src={`${
              currentLanguageCode === "en"
                ? "/zein322 -01.svg"
                : "/zein322 -11.svg"
            }`}
            width={120}
            height={120}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <p>
        © 2020{" "}
        <a href="//hasthemes.com" rel="noopener noreferrer" target="_blank">
          {strings["Zain"]}
        </a>
        .<br /> {strings["footerRights"]}
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default multilanguage(FooterCopyright);
