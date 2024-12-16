import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { actFetchAllProducts } from "../redux/features/product/productSlice";

import "./styles.scss";
import { addToCart } from "../redux/features/product/cartSlice";

const ProductPage = () => {
  const { loading, products } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);

  useEffect(() => {
    dispatch(actFetchAllProducts({}));
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <h1 className="title">Danh Sách Sản Phẩm</h1>
      {loading && <Spin />}
      <div className="menu-container">
        <Link to={"/product"}>IPhone</Link>
        <Link to={"/product"}>Samsung</Link>
        <Link to={"/product"}>Oppo</Link>
        <Link to={"/product"}>Poco</Link>
        <Link to={"/product"}>Redmi</Link>
        <Link to={"/product"}>Xiaomi</Link>
        <Link to={"/product"}>Nokia</Link>
        <Link to={"/product"}>Honor</Link>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">
                  {product.price.toLocaleString()} VND
                </p>
                <p className="product-description">{product.description}</p>
                <p className="product-attribute">
                  Thương hiệu: {product.brand}
                </p>
              </div>
            </Link>
            <div className="btn-container">
              <Button type="primary" className="order-button">
                Mua ngay
              </Button>
              <Button
                type="primary"
                className={`order-button add-to-cart ${
                  animateButton === product.id ? "animate" : ""
                }`}
                onClick={() => handleAddToCart(product)}
              >
                Thêm Vào Giỏ Hàng
              </Button>
            </div>
          </div>
        ))}
      </div>

      {cartNotification && (
        <div className="cart-notification">
          <p>Sản phẩm đã được thêm vào giỏ hàng!</p>
        </div>
      )}
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
};

export default ProductPage;
