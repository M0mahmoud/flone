import PropTypes from "prop-types";
import React from "react";
import TextGridOneSingle from "../../components/text-grid/TextGridOneSingle.js";
import textGridData from "../../data/text-grid/text-grid-one.json";
// !DEL
const TextGridOne = ({ spaceBottomClass }) => {
  return (
    <div
      className={`about-mission-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          {textGridData &&
            textGridData.map((single, key) => {
              return (
                <TextGridOneSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

TextGridOne.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default TextGridOne;
