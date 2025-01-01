import React from "react";
import { IoMdClose } from "react-icons/io";
import PopupParent from "./PopupParent";

const Popup = ({ close, title, content }) => {
  return (
    <PopupParent
      popup={
        <div className="bg-white border-md shadow-md p-4 flex flex-col w-[300px] sm:w-[400px] md:w-[500px] lg:w-[650px] rounded-lg shadow-green-500">
          <button className="self-end" onClick={close}>
            <IoMdClose />
          </button>
          <h1 className="text-lg lg:text-xl font-bold">{title}</h1>
          <div className="self-center mt-5 w-full">{content}</div>
        </div>
      }
    />
  );
};

export default Popup;
