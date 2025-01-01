import axios from "axios";
import React, { useEffect, useState } from "react";
import { APIURL } from "../utils/ApiURL";
import toast, { Toaster } from "react-hot-toast";

const Checkout = ({ token, trigger, setTrigger }) => {
  const [total, setTotal] = useState(null);

  const getTotal = async () => {
    try {
      const res = await axios.get(`${APIURL}/cart/total`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    try {
      const res = await axios.get(`${APIURL}/cart/checkout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrigger((e) => !e);
      toast.success("Your order is in progress!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getTotal();
  }, [trigger]);
  return (
    <div className="p-3 border-t w-full flex flex-col gap-5 max-w-[700px]">
      <Toaster />
      <h1 className="header-style text-base flex items-center gap-2">
        <p className="text-gray">Total: </p> $ {total && total.toFixed(2)}
      </h1>
      <button
        className="button-primary"
        onClick={checkout}
        disabled={total == 0}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
