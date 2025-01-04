import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css"; // Import Swiper styles
import axiosInstance from "../../api/api.js";

const HeroSliderFive = ({ spaceLeftClass, spaceRightClass }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/sliders");
        setData(response.data || []); // Ensure response structure is correct
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const params = {
    effect: "fade",
    // loop: true, // Enable looping
    // speed: 1000,
    // autoplay: {
    //   delay: 3500,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <div
      className={`slider-area ${spaceLeftClass || ""} ${spaceRightClass || ""}`}
    >
      <div className="slider-active nav-style-1">
        {loading || data.length === 0 ? (
          <p>Loading slides...</p>
        ) : (
          <Swiper {...params}>
            {data.map((single, key) => (
              <div
                key={key}
                className="single-slider-2 slider-height-1 slider-height-res15 d-flex align-items-center slider-height-res bg-img"
                style={{
                  backgroundImage: `url(https://zaien.test.do-go.net/images/${single.image})`,
                  minHeight: "80vh",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

HeroSliderFive.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderFive;
