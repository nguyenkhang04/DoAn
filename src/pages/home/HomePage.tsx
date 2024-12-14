import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { actFetchAllProducts } from "../redux/features/product/productSlice";
import { Spin, Button } from "antd";
import { Link } from "react-router-dom";
import ProductPage from "../product/ProductPage";

const HomePage = () => {
  return <div className="home-page">
    

  </div>;
};

export default HomePage;
