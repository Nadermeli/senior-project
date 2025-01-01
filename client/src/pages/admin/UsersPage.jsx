import React, { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import { APIURL } from "../../utils/ApiURL";
import Loading from "../../components/common/Loading";
import { AuthContext } from "../../context/AuthContext";

const UsersPage = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${APIURL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className=" h-full w-full flex flex-col gap-10">
      <h1 className="text-3xl font-semibold w-full border-b p-2">Users</h1>
      <div>
        <Table className="text-base">
          <Table.Head className="text-base">
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Ban</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.length > 0 &&
              users.map((user) => (
                <Table.Row className="bg-white " key={user.id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                    {user.full_name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.address}</Table.Cell>
                  <Table.Cell>{user.phone_number}</Table.Cell>
                  <Table.Cell>
                    {user.is_banned == 1 ? (
                      <button
                        href="#"
                        className="font-medium text-green-500 hover:underline "
                      >
                        Un-ban
                      </button>
                    ) : (
                      <button
                        href="#"
                        className="font-medium text-red-600 hover:underline "
                      >
                        Ban
                      </button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default UsersPage;
