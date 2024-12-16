import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  Button,
  Row,
  Col,
  Card,
  Space,
  Modal,
  InputNumber,
  Input,
  Radio,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import { removeFromCart } from "../redux/features/product/cartSlice";
import React from "react";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [deliveryMethod, setDeliveryMethod] =
    React.useState<string>("Giao Tận Nơi");

  const SHIPPING_COST = 3500000;

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handlePayment = () => {
    if (!name || !phone || !email || !address) {
      Modal.error({
        title: "Lỗi",
        content: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    console.log("Proceeding to payment with:", {
      name,
      phone,
      email,
      address,
      deliveryMethod,
    });
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
                      onChange={(value) => console.log(value)}
                    />
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="payment-form">
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
          placeholder="Tỉnh/Thành phố"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <p>
          Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng
          chi tiết hơn.
        </p>

        <Button type="primary" block onClick={handlePayment}>
          TIẾN HÀNH ĐẶT HÀNG
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
