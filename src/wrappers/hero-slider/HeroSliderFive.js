import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import axiosInstance from "../../api/api.js";
import HeroSliderFiveSingle from "../../components/hero-slider/HeroSliderFiveSingle.js";

const HeroSliderFive = ({ spaceLeftClass, spaceRightClass }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/sliders"); // API endpoint after base URL
        setData(response.data || []); // Adjust this if your API response has a different structure
      } catch (err) {
        setLoading(false);
        console.log("🚀 ~ fetchData ~ err:", err);
      }
    };
    fetchData();
  }, []);
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };
  return (
    <div
      className={`slider-area ${spaceLeftClass ? spaceLeftClass : ""} ${
        spaceRightClass ? spaceRightClass : ""
      }`}
    >
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {loading
            ? null
            : data.map((single, key) => (
                <HeroSliderFiveSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              ))}
        </Swiper>
      </div>
    </div>
  );
};

HeroSliderFive.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderFive;
