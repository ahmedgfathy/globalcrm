import React from "react";
import "./loader.css";
function Loader() {
  return (
    <div className="loader min-h-screen flex justify-center items-center">
      <div className="three-body">
        <div className="three-body__dot" />
        <div className="three-body__dot" />
        <div className="three-body__dot" />
      </div>
    </div>
  );
}

export default Loader;
