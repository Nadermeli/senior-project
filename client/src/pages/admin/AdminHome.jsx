import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { APIURL } from "../../utils/ApiURL";
import Loading from "../../components/common/Loading";
import { Table } from "flowbite-react";
import OrderPopup from "../../components/OrderPopup";

const AdminHome = () => {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState();
  const [openOrder, setOpenOrder] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${APIURL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const changeStatus = async (id, status) => {
    try {
      const res = await axios.post(
        `${APIURL}/admin/orders/${id}/status`,
        { status_id: status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrigger((e) => !e);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [trigger]);

  return (
    <div className="section-style">
      <h1 className="text-3xl font-semibold w-full border-b p-2">Orders</h1>
      <Table className="text-base">
        <Table.Head className="text-base">
          <Table.HeadCell>Order Date</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.length > 0 &&
            orders.map((order) => (
              <Table.Row className="bg-white " key={order.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  {new Date(order.order_date).toLocaleDateString("en-GB")}
                </Table.Cell>
                <Table.Cell>$ {order.total}</Table.Cell>
                <Table.Cell>{order.user.full_name}</Table.Cell>
                <Table.Cell>{order.user.phone_number}</Table.Cell>
                <Table.Cell>{order.user.email}</Table.Cell>
                <Table.Cell>{order.user.address}</Table.Cell>
                <Table.Cell>
                  <select
                    value={order.status_id}
                    className={`rounded-md ${
                      order.status_id == 1
                        ? "bg-yellow-200"
                        : order.status_id == 2
                        ? "bg-green-200"
                        : "bg-red-200"
                    } border-none`}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                  >
                    <option value="1" className="bg-white">
                      pending
                    </option>
                    <option value="2" className="bg-white">
                      delivered
                    </option>
                    <option value="3" className="bg-white">
                      cancelled
                    </option>
                  </select>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="button-gray"
                    onClick={() => setOpenOrder(order)}
                  >
                    View
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {loading && <Loading />}
      {openOrder && <OrderPopup order={openOrder} setOpen={setOpenOrder} />}
    </div>
  );
};

export default AdminHome;
