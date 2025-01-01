import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { APIURL } from "../../utils/ApiURL";
import { AuthContext } from "../../context/AuthContext";
import { FaPlus } from "react-icons/fa6";

const AddProductPopup = ({ close }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(1);
  const [categoryies, setCategories] = useState(0);
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState("");
  const [error, setError] = useState(false);
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);

  const { token } = useContext(AuthContext);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${APIURL}/categories`);
      console.log(response);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", category);
    formData.append("stock_quantity", stock);
    formData.append("colors", colors);
    formData.append("sizes", sizes);

    // Append each selected image to the formData
    for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]);
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`${APIURL}/admin/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setError(true);
      close();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-col gap-5 items-center">
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="Title"
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        name=""
        id=""
        cols="10"
        className="input-style md:w-[400px] resize-none"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="number"
        className="input-style md:w-[400px]"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        className="input-style md:w-[400px]"
        placeholder="Quantity"
        onChange={(e) => setStock(e.target.value)}
      />
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="width (cm) ,depth (cm), height(cm)"
        onChange={(e) => setSizes(e.target.value)}
      />
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="color1,color2,..."
        onChange={(e) => setColors(e.target.value)}
      />
      <select
        className="input-style md:w-[400px]"
        onChange={(e) => setCategory(e.target.value)}
      >
        {categoryies.length > 0 &&
          categoryies.map((cat) => <option value={cat.id}>{cat.name}</option>)}
      </select>

      <div className="flex flex-col items-center gap-2">
        <label
          htmlFor="file-upload"
          className="bg-gray-100 self-center flex gap-2 items-center rounded-lg text-lg p-3 cursor-pointer hover:opacity-80 "
        >
          <p>Images</p>
          <FaPlus />
        </label>
        {images.length > 0 && (
          <p className="self-center">{images.length} images selected</p>
        )}
      </div>
      <input
        type="file"
        id="file-upload"
        multiple
        onChange={(e) => setImages(e.target.files)}
        className="hidden"
      />

      <button className="button-primary self-center" onClick={addProduct}>
        Add
      </button>
      {error && (
        <p className="text-red-600 self-center"> Something went wrong</p>
      )}
    </div>
  );
};

export default AddProductPopup;
