import React, { useState, useEffect } from "react";
import { Row, Col, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import "./styles.scss";

interface TCartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const HeaderComponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const cartItems = useSelector((state: any) => state.cart.cartItems || []);

  const cartItemCount = cartItems.reduce(
    (total: number, item: TCartItem) => total + item.quantity,
    0
  );

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
      message.success("Bạn đã đăng xuất thành công!");
    } else {
      navigate("/login");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="header-component">
      <Row justify="space-between" align="middle">
        <Col>
          <div className="logo">
            <Link to={"/"}>PHONE VN</Link>
            <div className="bouncing-gold">💰</div>
          </div>
        </Col>

        <Col>
          <ul className="navigation">
            <li className="navigation-item">
              <Link to="/product?categoryId=1">Điện thoại</Link>
            </li>
            <li className="navigation-item">
              <Link to="/product?categoryId=2">Laptop</Link>
            </li>
            <li className="navigation-item">
              <Link to="/product?categoryId=3">Phụ Kiện</Link>
            </li>
            <li className="navigation-item">
              <Link to="/product?categoryId=4">Âm Thanh</Link>
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
                {cartItemCount > 0 && (
                  <span className="cart-item-count">{cartItemCount}</span>
                )}
              </button>
            </Link>
          </div>
        </Col>

        <Col>
          <Button onClick={handleLoginLogout} className="login-button">
            <FontAwesomeIcon icon={faUser} size="1x" />
            Tài Khoản
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
