import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import PopupParent from "../PopupParent";
import Auth from "../auth/Auth";
import { AuthContext } from "../../context/AuthContext";
import avatar from "../../assets/avatar.png";
import { FaBagShopping } from "react-icons/fa6";

const MainNavbar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const { user } = useContext(AuthContext);
  return (
    <div className="flex justify-between p-2 md:p-4 lg:px-6 lg:text-lg w-full">
      <div className="flex items-center gap-2">
        <span className="text-lg md:text-xl lg:text-2xl ">
          <FaLeaf />
        </span>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
          Furniture
        </h1>
      </div>
      <nav className=" gap-3 items-center hidden md:flex">
        <Link to={"/"} className="nav-button">
          Home
        </Link>
        <Link to={"/products"} className="nav-button">
          Products
        </Link>
        <Link to={"/about"} className="nav-button">
          About
        </Link>
      </nav>

      <div className="hidden md:block">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to={"/cart"} className=" text-xl lg:text-2xl">
              <FaBagShopping
                className="hover:opacity-80"
                style={{
                  fill: "lightslategrey",
                }}
              />
            </Link>
            <Link to={"/profile"}>
              <img
                src={avatar}
                alt="user"
                className="w-[50px] rounded-full border border-green-500"
              />
            </Link>
          </div>
        ) : (
          <button className="button-primary" onClick={() => setOpenLogin(true)}>
            Login
          </button>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden relative">
        <button className="text-2xl " onClick={() => setOpenLinks((e) => !e)}>
          {openLinks ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
        {openLinks && (
          <div className="absolute  flex flex-col gap-5 z-50 items-center right-0 rounded-md blur-effect p-6">
            <Link to={"/"} className="nav-button">
              Home
            </Link>
            <Link to={"/products"} className="nav-button">
              Products
            </Link>
            <Link to={"/about"} className="nav-button">
              About
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={"/cart"} className=" text-xl lg:text-xl">
                  <FaBagShopping
                    className="hover:opacity-80"
                    style={{
                      fill: "lightslategrey",
                    }}
                  />
                </Link>

                <Link to={"/profile"}>
                  <img
                    src={avatar}
                    alt="user"
                    className="w-[50px] rounded-full border border-green-500"
                  />
                </Link>
              </div>
            ) : (
              <button
                className="button-primary"
                onClick={() => setOpenLogin(true)}
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
      {openLogin && <Auth close={() => setOpenLogin(false)} />}
    </div>
  );
};

export default MainNavbar;
