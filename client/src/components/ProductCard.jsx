import React, { useContext, useEffect, useState } from "react";
import { APIURL, SOTRAGE_URL } from "../utils/ApiURL";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { TiTick } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ prod, i }) => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [inCart, setInCart] = useState(false);
  const [triggerCart, setTriggerCart] = useState(false);

  const checkIfProductInCart = async () => {
    try {
      const res = await axios.post(
        `${APIURL}/cart/isInCart`,
        { product_id: prod.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInCart(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(token);

  const addToCart = async () => {
    if (!token) {
      return toast.error("You have to be logged In");
    }
    try {
      const res = await axios.post(
        `${APIURL}/cart/add`,
        { product_id: prod.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTriggerCart((e) => !e);
      setInCart(true);
      toast.success("Added succesfully to cart");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(prod);

  useEffect(() => {
    checkIfProductInCart();
  }, []);
  return (
    <div
      className={`hover:shadow-md flex flex-col  shadow-sm relative overflow-hidden  rounded-md `}
      key={prod.id}
    >
      <Toaster />
      {inCart ? (
        <div className="absolute top-0 right-0 m-5 rounded-full bg-gray-200 p-1">
          <TiTick />
        </div>
      ) : (
        <button
          className="absolute top-0 right-0 m-5 rounded-full bg-black  p-1 hover:opacity-80"
          disabled={prod.stock_quantity == 0}
          onClick={() => addToCart()}
        >
          <FaPlus fill="white" />
        </button>
      )}
      {prod.images.length > 0 ? (
        <img
          src={`${SOTRAGE_URL}${prod.images[0].image_url}`}
          alt="image"
          className="w-[250px] h-[180px] lg:w-[300px] h-[230px] "
        />
      ) : (
        <div className="bg-gray-200 w-[250px] h-[180px] lg:w-[300px] h-[230px]"></div>
      )}
      <div className="p-3 flex flex-col ">
        <p className="font-semibold md:text-lg">{prod.name}</p>
        <p className="text-gray ">$ {prod.price}</p>
        <small className="text-gray">{prod.description}</small>
        <div className="flex gap-2 mt-2" key={i}>
          {prod.colors.split(",").map((color) => (
            <div
              style={{ background: color.trim() }}
              className="w-5 h-5 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <button className="button-gray" onClick={() => navigate(`${prod.id}`)}>
          View
        </button>
      </div>
      {prod.stock_quantity == 0 && (
        <div className="w-full h-full absolute bg-white/50">
          <div className="absolute top-1/2 left-1/2 w-[150px] rounded-md h-[50px] bg-black text-white flex items-center justify-center transform -translate-x-1/2  -translate-y-1/2">
            Out Of Stock
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
