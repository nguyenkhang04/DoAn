import React from "react";
import HeaderComponent from "../../component/HeaderComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../component/FooterComponent";
const HomeLayout = () => {
  return (
    <div className="home-layout">
      <HeaderComponent></HeaderComponent>
      <Outlet></Outlet>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default HomeLayout;
