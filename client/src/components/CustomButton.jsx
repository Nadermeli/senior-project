import React from "react";

const CustomButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className="button-primary">
      {text}
    </button>
  );
};

export default CustomButton;
