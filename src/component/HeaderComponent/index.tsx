import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.scss";

const HeaderComponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      alert("Bạn đã đăng xuất thành công!");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header-component">
      <Row justify="space-between" align="middle">
        <Col>
          <div className="logo">
            <Link to={"/"}>PHONE VN</Link>
          </div>
        </Col>

        <Col>
          <ul className="navigation">
            <li className="navigation-item">
              <Link to={"/product"}>Điện Thoại</Link>
            </li>
            <li className="navigation-item">
              <Link to={"/accessory"}>Phụ Kiện</Link>
            </li>
            <li className="navigation-item">
              <Link to={"/about"}>Bảo Hành</Link>
            </li>
          </ul>
        </Col>

        <Col>
          <div className="cart-container">
            <Link to="/cart">
              <button className="cart-button">
                Giỏ Hàng
                <ShoppingCartOutlined />
              </button>
            </Link>
          </div>
        </Col>

        <Col>
          <Button onClick={handleLoginLogout} className="login-button">
            {isLoggedIn ? "Đăng Xuất" : "Đăng Nhập"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
