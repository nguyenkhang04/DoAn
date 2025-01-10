import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import LoginPage from "./pages/login/LoginPage";
import HomeLayout from "./layouts/homeLayout";
import AdminLayout from "./layouts/adminLayout";
import ProductDetailPage from "./pages/productDetail/productDetail";
import AboutPage from "./pages/about/AboutPage";
import CartPage from "./pages/cart/CartPage";
import OrderHistoryPage from "./pages/orderHistoryPage/OrderHistoryPage";
import UpdateProfilePage from "./pages/updateprofile/UpdateProfilePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/order-history" element={<OrderHistoryPage></OrderHistoryPage>} />
            <Route path="/login/update-profile" element={<UpdateProfilePage></UpdateProfilePage>} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
