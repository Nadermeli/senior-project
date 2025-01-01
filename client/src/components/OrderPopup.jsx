import React from "react";
import PopupParent from "./PopupParent";
import Popup from "./Popup";
import { Link } from "react-router-dom";

const OrderPopup = ({ order, setOpen }) => {
  return (
    <PopupParent
      popup={
        <Popup
          close={() => setOpen(null)}
          title={"Order details"}
          content={
            <div className="flex flex-col p-5 gap-5">
              <div className="flex justify-between w-full">
                <h1 className="font-semibold flex flex-col items-center">
                  <p>Ordered At: </p>
                  <p className="text-gray">
                    {new Date(order.order_date).toLocaleDateString("en-GB")}
                  </p>
                </h1>
                <h1 className="font-semibold flex flex-col items-center">
                  Status:
                  <p className="text-gray">{order.status.status_name}</p>
                </h1>
              </div>
              {order.order_items.length > 0 &&
                order.order_items.map((item, i) => (
                  <div
                    className="flex justify-between w-full border-b p-3"
                    key={i}
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <p className="">{item.product.name}</p>
                      <p> qty: {item.quantity}</p>
                      <p>price: {item.price}</p>
                    </div>
                    <Link
                      to={`/products/${item.product.id}`}
                      className="button-gray"
                    >
                      View
                    </Link>
                  </div>
                ))}
            </div>
          }
        />
      }
    />
  );
};

export default OrderPopup;
