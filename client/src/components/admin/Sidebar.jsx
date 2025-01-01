import React, { useContext, useState } from "react";
import { FaLeaf } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "z-50" : "z-0"
      } flex h-screen fixed top-0 left-0 w-[300px] `}
    >
      <div
        className={`bg-gray-100 flex flex-col  p-4  top-0 left-0 h-full w-[300px] transition-all relative duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-3/4"
        }`}
      >
        <ul>
          <div className="flex items-center gap-2 mb-10">
            <span className="text-lg md:text-xl lg:text-2xl ">
              <FaLeaf />
            </span>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
              Furniture
            </h1>
          </div>
          <li>
            <Link
              to="/admin"
              className={`block p-2 rounded-lg hover:opacity-80 text-lg ${
                location.pathname == "/admin" && "bg-green-500 text-white"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`block p-2 rounded-lg hover:opacity-80 text-lg ${
                location.pathname == "/admin/users" && "bg-green-500 text-white"
              }`}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`block p-2 rounded-lg hover:opacity-80 text-lg ${
                location.pathname == "/admin/products" &&
                "bg-green-500 text-white"
              }`}
            >
              Products
            </Link>
          </li>
        </ul>

        <button
          onClick={toggleSidebar}
          className=" absolute  my-auto right-0 text-3xl"
        >
          <IoIosArrowForward />
        </button>
        <div className="flex self-center justify-end mt-auto">
          <button
            className="bg-red-600 font-semibold text-white p-3 rounded-lg "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
