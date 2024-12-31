import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";
// !DEL
const BannerFive = ({ strings, currentLanguageCode }) => {
  const [bannerData, setBannerData] = useState(null);

  // Fetch the banner data when the component mounts
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axiosInstance.get("/offers-banner");
        setBannerData(response.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };
    fetchBannerData();
  }, []);

  // Handle loading state
  if (!bannerData) {
    return <div className="loading-spinner" />;
  }

  return (
    <div className="banner-area hm9-section-padding">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    <img src={"/banner-21.png"} alt="Banner" loading="lazy" />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-1">
                    <h3>{strings["Banner_green_apple"]}</h3>
                    <p>
                      {strings["Banner_starting_at"]} <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    <img src={"/banner-22.png"} alt="Banner" loading="lazy" />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-1">
                    <h3>{strings["Banner_ripe_orange"]}</h3>
                    <p>
                      {strings["Banner_starting_at"]} <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/shop"}>
                <img src={"/banner-23.png"} alt="Banner" loading="lazy" />
              </Link>
              <div className="banner-content-4 banner-position-hm15-2">
                <span>
                  {currentLanguageCode === "en"
                    ? bannerData.offers[0]?.translations[1].description
                    : bannerData.offers[0]?.translations[0].description}
                </span>
                <h2>{bannerData.banner_title[currentLanguageCode]}</h2>
                <h5>
                  {`${
                    currentLanguageCode !== "en"
                      ? bannerData.banner_description.en
                      : bannerData.banner_description.ar
                  }`}
                </h5>{" "}
                <Link to={process.env.PUBLIC_URL + "/shop"}>
                  {strings["shop_now"]}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    <img src={"/banner-24.png"} alt="Banner" loading="lazy" />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2">
                    <h3>{strings["Banner_ripe_corn"]}</h3>
                    <p>
                      {strings["Banner_starting_at"]} <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    <img src={"/banner-25.png"} alt="Banner" loading="lazy" />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2">
                    <h3>{strings["Banner_green_guava"]}</h3>
                    <p>
                      {strings["Banner_starting_at"]} <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default multilanguage(BannerFive);
