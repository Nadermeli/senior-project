import React, { useContext, useEffect, useState } from "react";
import { APIURL } from "../utils/ApiURL";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/common/Loading";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";

const Cart = () => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [triggerCart, setTriggerCart] = useState(false);
  const getCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${APIURL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCart();
  }, [triggerCart]);

  return (
    <div className="section-style">
      <h1 className="header-style">Cart</h1>
      <div className="self-center p-5 w-full overflow-y-auto max-h-[60vh] max-w-[700px]">
        {cartItems.length > 0 ? (
          cartItems.map((item, i) => (
            <CartItem
              item={item}
              token={token}
              key={i}
              setTrigger={setTriggerCart}
            />
          ))
        ) : (
          <p className="self-center justify-self-center">Your cart is empty</p>
        )}
      </div>
      <div className="self-center items-center flex justify-center bottom-0 m-5 absolute w-full p-3 ">
        <Checkout
          token={token}
          trigger={triggerCart}
          setTrigger={setTriggerCart}
        />
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Cart;
