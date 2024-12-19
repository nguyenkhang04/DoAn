import React from "react";
import HeaderComponent from "../../component/HeaderComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../component/FooterComponent";
import "./styles.scss";
const HomeLayout = () => {
  return (
    <div className="home-layout">
      <HeaderComponent></HeaderComponent>
      <Outlet></Outlet>
      <FooterComponent></FooterComponent>
      <div className="lantern">🏮</div>
      <div className="lantern">🏮</div>
      <div className="lantern">🏮</div>
      <div className="lantern">🏮</div>
      
      <div className="li-xi">🧧</div>
      <div className="li-xi">🧧</div>
      <div className="li-xi">🧧</div>
    </div>
  );
};

export default HomeLayout;
