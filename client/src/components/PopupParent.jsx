import React from "react";

const PopupParent = ({ popup }) => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex items-center justify-center z-50">
      {popup}
    </div>
  );
};

export default PopupParent;
