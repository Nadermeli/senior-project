import React from "react";
import { APIURL, SOTRAGE_URL } from "../utils/ApiURL";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import axios from "axios";

const CartItem = ({ item, setTrigger, token }) => {
  const add = async () => {
    try {
      const res = await axios.post(
        `${APIURL}/cart/add`,
        { product_id: item.product.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrigger((e) => !e);
    } catch (error) {
      console.log(error);
    }
  };

  const decrease = async () => {
    try {
      const res = await axios.post(
        `${APIURL}/cart/decrease`,
        { product_id: item.product.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrigger((e) => !e);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async () => {
    try {
      const res = await axios.post(
        `${APIURL}/cart/remove`,
        { product_id: item.product.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrigger((e) => !e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b p-5 flex justify-between w-full ">
      <div className="flex items-center gap-4 md:gap-6">
        {item.product.images.length > 0 ? (
          <img
            src={`${SOTRAGE_URL}${item.product.images[0].image_url}`}
            alt="image"
            className="w-[80px] md:w-[120px] lg:w-[150px]"
          />
        ) : (
          <div className="bg-gray-200 w-[80px] md:w-[120px] lg:w-[150px]"></div>
        )}
        <div className="flex flex-col items-center">
          <p className="text-gray text-xs md:text-base">{item.product.name}</p>
          <h1 className="font-semibold text-sm md:text-lg">
            $ {item.product.price * item.quantity}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded-full bg-gray-100 text-sm md:text-base hover:opacity-80"
            onClick={add}
          >
            <FaPlus />
          </button>
          <p>{item.quantity}</p>
          <button
            className="p-1 rounded-full bg-gray-100 text-sm md:text-base hover:opacity-80"
            onClick={decrease}
          >
            <FaMinus />
          </button>
        </div>
        <button
          className="text-sm md:text-base hover:opacity-80"
          onClick={remove}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
