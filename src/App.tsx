import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import LoginPage from "./pages/login/LoginPage";
import HomeLayout from "./layouts/homeLayout";
import AdminLayout from "./layouts/adminLayout";
import AdminUsers from "./pages/admin/users/adminUsers";
import AdminProduct from "./pages/admin/products/adminProduct";
import ProductDetailPage from "./pages/productDetail/productDetail";
import AboutPage from "./pages/about/AboutPage";
import CartPage from "./pages/cart/CartPage";
import AccessoryPage from "./pages/accessory/AccessoryPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout></HomeLayout>}>
            <Route index element={<HomePage></HomePage>}></Route>
            <Route path="/about" element={<AboutPage></AboutPage>}></Route>
            <Route
              path="/product"
              element={<ProductPage></ProductPage>}
            ></Route>
            <Route
              path="/product/:productId"
              element={<ProductDetailPage></ProductDetailPage>}
            ></Route>
            <Route path="/accessory" element={<AccessoryPage></AccessoryPage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/cart" element={<CartPage></CartPage>}></Route>
          </Route>

          <Route path="/admin" element={<AdminLayout></AdminLayout>}>
            <Route index element={<AdminUsers></AdminUsers>}></Route>
            <Route
              path="products"
              element={<AdminProduct></AdminProduct>}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
