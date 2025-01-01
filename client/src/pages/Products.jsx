import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIURL, SOTRAGE_URL } from "../utils/ApiURL";
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [sortOrder, setSortOrder] = useState("recent");
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${APIURL}/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(`${APIURL}/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products.length]);

  useEffect(() => {
    filterProducts();
  }, [searchValue, categoryFilter]);
  useEffect(() => {
    sortProducts();
  }, [sortOrder]);

  const filterProducts = () => {
    if (categoryFilter == 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            product.category_id == categoryFilter
        )
      );
    }
  };

  const sortProducts = () => {
    if (sortOrder == "recent") {
      return filterProducts();
    }
    let sortedProducts = [...filteredProducts];
    if (sortOrder === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="section-style ">
      <h1 className="header-style">Products</h1>
      <div className="flex flex-col md:flex-row gap-3 justify-between border-b p-3">
        <div className="search-btn">
          <p className="text-xl">
            <IoIosSearch />
          </p>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search"
            className="outline-noen border-none focus:ring-0"
          />
        </div>

        <div className="flex flex-col lg:flex-row  items-center gap-3">
          <select
            className="dropwdown gray-border w-full text-gray-700 focus:ring-0 outline-none focus:border-gray-500"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="recent">All</option>
            <option value="high-low">$ high-low</option>
            <option value="low-high">$ low-high</option>
          </select>
          <select
            className="dropwdown gray-border w-full text-gray-700 focus:ring-0 outline-none focus:border-gray-500"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value={0}>All</option>
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={`flex  gap-5 flex-wrap  justify-center`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod, i) => <ProductCard prod={prod} i={i} />)
        ) : (
          <p>No Products match these filters</p>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Products;
