import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { APIURL } from "../utils/ApiURL";
import OrderPopup from "../components/OrderPopup";
import Loading from "../components/common/Loading";

const UserProfile = () => {
  const { logout, token } = useContext(AuthContext);
  const [openOrder, setOpenOrder] = useState(null);
  const [loading, setLoading] = useState(null);

  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${APIURL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
    <div className="section-style">
      <h1 className="header-style">Orders</h1>
      <div className="p-5 flex flex-col max-w-[700px] self-center w-full h-[60vh] overflow-y-auto">
        {orders.length > 0 &&
          orders.map((order, i) => (
            <div
              className={`${
                order.status_id == 2
                  ? "bg-green-100"
                  : order.status_id == 3 && "bg-red-100"
              } p-4 border-b flex justify-between items-center rounded-md w-full `}
              key={i}
            >
              <div className="flex items-center gap-4 text-sm md:text-base">
                <h1 className="flex items-center flex-col">
                  <p className="text-gray">Date: </p>
                  {new Date(order.order_date).toLocaleDateString("en-GB")}
                </h1>
                <h1 className="flex items-center flex-col">
                  <p className="text-gray">Total: </p>$ {order.total}
                </h1>
              </div>
              <button
                className="button-gray"
                onClick={() => setOpenOrder(order)}
              >
                View{" "}
              </button>
            </div>
          ))}
      </div>
      <button
        onClick={logout}
        className="button-danger self-center absolute bottom-0 mb-10"
      >
        logout
      </button>
      {openOrder && <OrderPopup order={openOrder} setOpen={setOpenOrder} />}
      {loading && <Loading />}
    </div>
  );
};

export default UserProfile;
