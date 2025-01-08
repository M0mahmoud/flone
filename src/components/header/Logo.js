import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
// !DEL
const Logo = ({ currentLanguageCode, logoClass }) => {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(null); // Start with null to avoid premature API calls

    useEffect(() => {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  };

  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img
          alt=""
          src={`${
            currentLanguageCode === "en" ? "/zein EN.svg" : "/zein AR.svg"
          }`}
          width={isMobileOrTablet ? 50 : 80}
          height={isMobileOrTablet ? 50 : 80}
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
