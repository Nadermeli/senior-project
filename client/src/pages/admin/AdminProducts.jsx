import React, { useContext, useEffect, useState } from "react";
import { APIURL, SOTRAGE_URL } from "../../utils/ApiURL";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/common/Loading";
import { FaPlus } from "react-icons/fa6";
import Popup from "../../components/Popup";
import AddProductPopup from "./AddProductPopup";

const AdminProducts = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${APIURL}/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${APIURL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className=" h-full w-full overflow-auto">
      <h1 className="text-3xl font-semibold w-full border-b p-2">Products</h1>
      <div className="flex flex-wrap gap-8 items-center p-5">
        {products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] h-[350px] lg:w-[350px] lg:h-[400px] bg-gray-100 rounded-lg shadow-md z-10"
            >
              {product.images.length > 0 ? (
                <img
                  src={`${SOTRAGE_URL}${product.images[0]?.image_url}`}
                  className="w-full h-1/2"
                  alt="product image"
                />
              ) : (
                <div className="w-full h-1/2 bg-gray-200"></div>
              )}
              <div className="flex flex-col w-full  gap-3 p-2">
                <p className="font-semibold text-lg lg:text-xl">
                  {product.name}
                </p>
                <small className="text-gray md:text-base">
                  {product.description}
                </small>
                <p className="text-gray font-semibold md:text-lg">
                  $ {product.price}
                </p>
                <div className="flex gap-3 items-center w-full self-center text-sm">
                  <button className="p-3  w-full text-center rounded-lg border font-semibold bg-gray-200 hover:opacity-80 ">
                    Edit
                  </button>
                  <button
                    className="p-3 w-full text-center rounded-lg font-semibold text-white bg-red-600 hover:opacity-80"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        <button
          className="bg-gray-100 rounded-lg text-2xl p-5 hover:opacity-80 z-10"
          onClick={() => setOpenAdd(true)}
        >
          <FaPlus />
        </button>
      </div>
      {loading && <Loading />}
      {openAdd && (
        <Popup
          content={
            <AddProductPopup
              close={() => {
                setOpenAdd(false);
                getProducts();
              }}
            />
          }
          title={"Add Product"}
          close={() => setOpenAdd(false)}
        />
      )}
    </div>
  );
};

export default AdminProducts;
