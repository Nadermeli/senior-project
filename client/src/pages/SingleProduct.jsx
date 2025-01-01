import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIURL, SOTRAGE_URL } from "../utils/ApiURL";
import Loading from "../components/common/Loading";
import { Carousel } from "flowbite-react";
import ImagesCarousel from "../components/ImagesCarousel";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const SingleProduct = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [triggerCart, setTriggerCart] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${APIURL}/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const checkIfProductInCart = async () => {
    try {
      const res = await axios.post(
        `${APIURL}/cart/isInCart`,
        { product_id: product.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInCart(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    product && checkIfProductInCart();
  }, [triggerCart, product]);

  const addToCart = async () => {
    if (!token) {
      return toast.error("You have to be logged In");
    }
    try {
      const res = await axios.post(
        `${APIURL}/cart/add`,
        { product_id: product.id, quantity: 1 },
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

  return (
    <div className="section-style ">
      <Toaster />
      {product && (
        <>
          <h1 className="header-style">{product && product.name}</h1>
          <div className="self-center  flex flex-col lg:flex-row  lg:items-center gap-3 lg:gap-8 lg:mt-20 xl:gap-20  p-5">
            <div className=" lg:w-full self-center flex flex-col md:flex-row my-6">
              {product.images.length > 0 && (
                <ImagesCarousel images={product.images} />
              )}
            </div>
            <div className="flex flex-col w-full gap-3 lg:text-lg">
              <p className="text-gray font-semibold ">{product.description}</p>
              <p className="font-semibold flex gap-2 items-center">
                Category:{" "}
                <span className="text-gray">{product.category.name}</span>
              </p>
              <p className="font-semibold flex gap-2 items-center">
                Colors:{" "}
                <span className="flex gap-2">
                  {product.colors.split(",").map((color, i) => (
                    <div
                      key={i}
                      style={{ background: color.trim() }}
                      className="w-5 h-5 rounded-full border-2 border-white"
                    />
                  ))}
                </span>
              </p>
              <div className="font-semibold flex gap-2 items-center">
                Size:{" "}
                <span className="flex gap-2 text-gray">
                  <div className="text-gray">
                    W: {product.sizes.split(",")[0]} cm
                  </div>
                  ,
                  <div className="text-gray">
                    H: {product.sizes.split(",")[1]} cm
                  </div>
                  ,
                  <div className="text-gray">
                    D: {product.sizes.split(",")[2]} cm
                  </div>
                </span>
              </div>
              <p className="text-gray font-semibold">
                {product.stock_quantity} pieces Left
              </p>
              <div className="absolute bottom-0 lg:relative lg:mt-10 left-0 p-5 flex flex-col gap-5 w-full border-t">
                <p className="font-semibold text-lg">$ {product.price}</p>
                {inCart ? (
                  <button className="button-primary w-full" disabled={true}>
                    Added To Cart
                  </button>
                ) : (
                  <button className="button-primary w-full" onClick={addToCart}>
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default SingleProduct;
