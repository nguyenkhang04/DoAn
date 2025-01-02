import React, { useEffect, useState } from "react";
import { productApis } from "../../apis/productApis";
import "./styles.scss";

interface Order {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: string;
  cartItems: { productId: string; quantity: number }[];
  userId: number;
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId"); 
    if (!userId) {
      setError("Bạn chưa đăng nhập!");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await productApis.fetchOrders();
        const filteredOrders = data.filter(
          (order: Order) => order.userId.toString() === userId
        );
        setOrders(filteredOrders);
      } catch (err) {
        setError("Không thể tải lịch sử mua hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div className="order-history">
      <h1 className="order-history__title">Lịch Sử Mua Hàng</h1>
      {orders.length === 0 ? (
        <p className="order-history__empty">Chưa Có Lịch Sử Mua Hàng</p>
      ) : (
        <div className="order-history__container">
          <ul className="order-history__list">
            {orders.map((order) => (
              <li key={order.id} className="order-history__item">
                <h2 className="order-history__order-id">Mã Đơn Hàng: {order.id}</h2>
                <p className="order-history__detail">Tên: {order.name}</p>
                <p className="order-history__detail">Số Điện Thoại: {order.phone}</p>
                <p className="order-history__detail">Email: {order.email}</p>
                <p className="order-history__detail">Địa Chỉ: {order.address}</p>
                <p className="order-history__detail">Kiểu Giao Hàng: {order.deliveryMethod}</p>
                <h3 className="order-history__cart-title">Sản Phẩm:</h3>
                <ul className="order-history__cart-list">
                  {order.cartItems.map((item, index) => (
                    <li key={index} className="order-history__cart-item">
                      .  Tên Sản Phẩm: {item.productId}, Số Lượng: {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
};

export default OrderHistoryPage;
