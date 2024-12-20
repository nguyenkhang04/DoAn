import React, { useEffect } from "react";
import ProductPage from "../product/ProductPage";
import Advertisement from "../advertisement/Advertisement";
import AccessoryPage from "../accessory/AccessoryPage";
import LaptopPage from "../laptop/LaptopPage";
import "./styles.scss";
import SoundPage from "../soundpage/SoundPage";

const HomePage = () => {
  return (
    <div className="home-page">
      <Advertisement />
      <ProductPage />

      <div className="Tet-advertising">
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/480x0/filters:quality(100)/H3_405x175_4fdc4f2fc6.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H2_614x212_7_a0209cd3f9.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_2_7cd0eb3667.png"
          alt=""
        />
      </div>
      <div id="fireworks-container"></div>
      <div className="flower"></div>
      <div className="flower"></div>
      <div className="flower"></div>
      <div className="flower"></div>
      <AccessoryPage />
      <div className="Tet-advertising">
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_8ff93cb7e6.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_71b225aaa3.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x1753x_5ff720ef1c.png"
          alt=""
        />
      </div>
      <LaptopPage />
      <SoundPage></SoundPage>
    </div>
  );
};

export default HomePage;
