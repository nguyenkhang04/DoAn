import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Row, Col, Card, Space, Modal, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import { removeFromCart } from "../redux/features/product/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart-page">
      <h1 className="title">Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện tại trống.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {cartItems.map((item) => (
            <Col key={item.product.id} span={8}>
              <Card
                title={item.product.name}
                extra={<DeleteOutlined onClick={() => handleRemoveFromCart(item.product.id)} />}
                hoverable
                className="cart-item-card"
              >
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p>{item.product.price} VND</p>
                  <p>Số lượng: 
                    <InputNumber
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(value) => console.log(value)}
                    />
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="cart-summary">
        <Button type="primary" block>
          Thanh Toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
