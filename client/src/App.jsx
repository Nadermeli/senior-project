import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import AdminHome from "./pages/admin/AdminHome";
import UsersPage from "./pages/admin/UsersPage";
import AdminProducts from "./pages/admin/AdminProducts";
import Footer from "./components/common/Footer";
import MainNavbar from "./components/common/Navbar";
import "./App.css";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdmin from "./utils/routes/ProtectedAdmin";
import ProtectedUser from "./utils/routes/ProtectedUser";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <MainNavbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <MainNavbar />
              <Products />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <MainNavbar />
              <SingleProduct />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <MainNavbar />
              <About />
              <Footer />
            </>
          }
        />

        {/* User Routes */}
        <Route element={<ProtectedUser />}>
          <Route
            path="/profile"
            element={
              <>
                <MainNavbar />
                <UserProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <MainNavbar />
                <Cart />
                <Footer />
              </>
            }
          />
        </Route>
        {/* Admin Routes */}
        <Route element={<ProtectedAdmin />}>
          <Route
            path="/admin"
            element={<AdminLayout children={<AdminHome />} />}
          />
          <Route
            path="/admin/users"
            element={<AdminLayout children={<UsersPage />} />}
          />
          <Route
            path="/admin/products"
            element={<AdminLayout children={<AdminProducts />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
