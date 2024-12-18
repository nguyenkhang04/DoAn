import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { actFetchAllProducts } from "../redux/features/product/productSlice";
import { addToCart } from "../redux/features/product/cartSlice";
import { Button, Input, Spin } from "antd";
import BrandFilter from "../brandfilter/BrandFilter";
import { Link } from "react-router-dom";

const LaptopPage: React.FC = () => {
  const { loading, products } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    dispatch(actFetchAllProducts({}));
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(true), 3000);
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filteredProducts = products.filter(
    (product) =>
      product.category === "Laptop" &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="home-page">
      <h2>Laptop</h2>
      <div className="product-list">
        {displayedProducts.map((product) => (
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
              <Button
                type="primary"
                className={`order-button add-to-cart ${
                  animateButton === product.id ? "animate" : ""
                }`}
                onClick={() => handleAddToCart(product)}
              >
                Bỏ Vào Giỏ Hàng
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button className="show-more-button" onClick={handleToggleShowAll}>
        {showAll ? "Ẩn Bớt" : "Xem Thêm"}
      </Button>

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

export default LaptopPage;
