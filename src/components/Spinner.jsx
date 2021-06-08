import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-pulse">
      <div className="spinner-inner">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
