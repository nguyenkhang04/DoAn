import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Row, Col, Card, Modal, InputNumber, Input, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../redux/features/product/cartSlice";
import { submitUserInfo } from "../redux/features/product/userSlice";

const CartPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const user = useSelector((state: RootState) => state.user.loggedInUser);
  const [name, setName] = useState<string>(user?.name || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [address, setAddress] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Giao Tận Nơi");

 
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

 const handlePayment = () => {
    const userId = sessionStorage.getItem("userId"); 
    if (!userId) {
      Modal.error({
        title: "Lỗi",
        content: "Vui lòng đăng nhập để thực hiện đặt hàng!",
      });
      return;
    }

    if (!name || !phone || !email || !address) {
      Modal.error({
        title: "Lỗi",
        content: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }
    const userInfo = {
      name,
      phone,
      email,
      address,
      deliveryMethod,
      cartItems: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      userId: parseInt(userId, 10), 
    };

    dispatch(submitUserInfo(userInfo));

    Modal.success({
      title: "Đặt hàng thành công",
      content: "Thông tin của bạn đã được gửi, chúng tôi sẽ liên hệ sớm nhất.",
    });
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item.product.price);
    const quantity = Number(item.quantity);

    return total + price * quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1 className="title">Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <div>Giỏ hàng của bạn hiện tại trống.</div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <Row gutter={[16, 16]}>
              {cartItems.map((item) => (
                <Col key={item.product.id} span={8}>
                  <Card
                    title={item.product.name}
                    extra={
                      <DeleteOutlined
                        onClick={() => handleRemoveFromCart(item.product.id)}
                      />
                    }
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
                      <p>
                        Số lượng:
                        <InputNumber
                          min={1}
                          defaultValue={item.quantity}
                          onChange={(value) =>
                            handleQuantityChange(item.product.id, value || 1)
                          }
                        />
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="payment-form">
            <div className="total-price">
              Tổng tiền: <span>{totalPrice.toLocaleString()} VND</span>
            </div>

            <h3>Thông tin khách hàng</h3>
            <Input
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: 10 }}
            />

            <h3>Chọn cách thức nhận hàng</h3>
            <Radio.Group
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              style={{ marginBottom: 10 }}
            >
              <Radio value="Giao Tận Nơi">Giao tận nơi</Radio>
              <Radio value="Nhận Tại Cửa Hàng">Nhận tại cửa hàng</Radio>
            </Radio.Group>

            <h3>Thông tin nhận hàng</h3>
            <Input
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ marginBottom: 10 }}
            />

            <Button
              className="buy"
              type="primary"
              block
              onClick={handlePayment}
            >
              TIẾN HÀNH ĐẶT HÀNG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
