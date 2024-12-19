import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { actFetchAllProducts } from "../redux/features/product/productSlice";
import "./styles.scss";
import { addToCart } from "../redux/features/product/cartSlice";

const AccessoryPage = () => {
  const { loading, products } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(actFetchAllProducts({}));
  }, [dispatch]);

  const accessories = products.filter(
    (product) => product.category === "accessory"
  );

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(false), 3000);
  };
  const filteredProducts = products.filter(
    (product) => product.category === "accessory"
  );
  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);
  const handleShowMore = () => {
    setExpanded(!expanded);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="accessory-page">
      <h2 className="title">Phụ Kiện</h2>
      {loading && <Spin />}
      <div className={`product-list ${expanded ? "expanded" : ""}`}>
        {accessories.length > 0 ? (
          accessories
            .slice(0, expanded ? accessories.length : 8)
            .map((product) => (
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
                      {Number(product.price).toLocaleString()} VND
                    </p>
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
            ))
        ) : (
          <p>Không có phụ kiện nào để hiển thị</p>
        )}
      </div>

      <Button onClick={handleShowMore} className="show-more-button">
        {expanded ? "Ẩn bớt" : "Xem Thêm"}
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

export default AccessoryPage;
