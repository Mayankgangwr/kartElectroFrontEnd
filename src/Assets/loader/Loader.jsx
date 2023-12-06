import React from "react";
import "../../loader.styles.css";

const Loader = () => {
  return (
    <div className="text-loader font-monoton flex flex-col gap-1 items-center">
      <span>
        <img
          width={100}
          src={'assets/loading.gif'}
          alt="loading..."
          className="opacity-[0.25]"
        />
      </span>
      <div className="text-container">
        <span className="letter">K</span>
        <span className="letter">A</span>
        <span className="letter">R</span>
        <span className="letter">T</span>
        <span className="letter">E</span>
        <span className="letter">L</span>
        <span className="letter">E</span>
        <span className="letter">C</span>
        <span className="letter">T</span>
        <span className="letter">R</span>
        <span className="letter">O</span>
      </div>
    </div>
  );
};

export default Loader;
