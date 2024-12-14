import { Row, Col, Button, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.scss";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
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
              <Link to={"/"}>Home</Link>
            </li>
            <li className="navigation-item">
              <Link to={"/about"}>Laptop</Link>
            </li>
            <li className="navigation-item">
              <Link to={"/product"}>Phone</Link>
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
          <Button onClick={handleLogin} className="login-button">
            Log In
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
