import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
// !DEL
const FooterTwo = ({
  backgroundColorClass,
  copyrightColorClass,
  spaceLeftClass,
  spaceRightClass,
  footerTopBackgroundColorClass,
  footerTopSpaceTopClass,
  footerTopSpaceBottomClass,
  footerLogo,
  backgroundImage,
  currentLanguageCode,
  strings,
}) => {
  const [footer, setFooter] = useState({});
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/settings")
      .then((res) => setFooter(res.data))
      .catch(() => setFooter({}));
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ""
      } ${spaceLeftClass ? spaceLeftClass : ""} ${
        spaceRightClass ? spaceRightClass : ""
      } ${backgroundImage ? "bg-img" : ""}`}
      style={{
        backgroundImage: ` ${
          backgroundImage
            ? `url(${process.env.PUBLIC_URL + backgroundImage})`
            : `url()`
        }`,
      }}
    >
      <div
        className={`footer-top text-center ${
          footerTopBackgroundColorClass ? footerTopBackgroundColorClass : ""
        } ${footerTopSpaceTopClass ? footerTopSpaceTopClass : ""}  ${
          footerTopSpaceBottomClass ? footerTopSpaceBottomClass : ""
        }`}
      >
        <div className="container">
          <div className="footer-logo">
            <Link to={process.env.PUBLIC_URL}>
              <img
                alt=""
                src={
                  process.env.PUBLIC_URL +
                  `${footerLogo ? footerLogo : "/assets/img/logo/logo.png"}`
                }
              />
            </Link>
          </div>
          <p>
            {footer && currentLanguageCode === "ar"
              ? footer?.settings?.translations[0]?.about_us
              : footer?.settings?.translations[1]?.about_us}
          </p>
          <div className="footer-social">
            <ul>
              {footer?.socails?.map((el, index) => (
                <li key={el.id || index}>
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://zaien.test.do-go.net/images/${el.icon}`}
                      alt={`Social media icon ${index + 1}`}
                      className="social-media-icon"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <div className="container">
          <div
            className={`copyright-2 ${
              copyrightColorClass ? copyrightColorClass : ""
            }`}
          >
            <p>
              © 2020{" "}
              <a
                href="//www.hasthemes.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                {footer && currentLanguageCode === "ar"
                  ? footer?.settings?.translations[0]?.title
                  : footer?.settings?.translations[1]?.title}
              </a>
              {strings["footerRights"]}
            </p>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterTwo.propTypes = {
  backgroundColorClass: PropTypes.string,
  copyrightColorClass: PropTypes.string,
  footerLogo: PropTypes.string,
  backgroundImage: PropTypes.string,
  footerTopBackgroundColorClass: PropTypes.string,
  footerTopSpaceBottomClass: PropTypes.string,
  footerTopSpaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default multilanguage(FooterTwo);
