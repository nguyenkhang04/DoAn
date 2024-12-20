import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { actFetchAllProducts } from "../redux/features/product/productSlice";
import { Button } from "antd";
import { addToCart } from "../redux/features/product/cartSlice";
import { Link } from "react-router-dom";
import "./styles.scss";

const BrandFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);

  useEffect(() => {
    dispatch(actFetchAllProducts({}));
  }, [dispatch]);

  const handleBrandClick = (brand: string) => {
    setActiveBrand(brand);
    const filtered = products.filter(
      (product) => product.brand.toLowerCase() === brand.toLowerCase()
    );
    setFilteredProducts(filtered);
  };

  const handleResetFilter = () => {
    setActiveBrand(null);
    setFilteredProducts([]);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(false), 3000);
  };

  return (
    <div className="brand-filter-page">
      <div className="menu-container">
        <Link
          to="#"
          onClick={handleResetFilter}
          className={`brand-link ${activeBrand === null ? "active" : ""}`}
        >
          Bỏ Lọc Sản Phẩm
        </Link>
        {[
          "IPhone",
          "Samsung",
          "Oppo",
          "Poco",
          "Xiaomi",
          "Nokia",
          "Honor",
        ].map((brand) => (
          <Link
            key={brand}
            to="#"
            onClick={() => handleBrandClick(brand)}
            className={`brand-link ${activeBrand === brand ? "active" : ""}`}
          >
            {brand}
          </Link>
        ))}
      </div>

      {activeBrand || filteredProducts.length > 0 ? (
        <div>
          <h3>
            {activeBrand ? `Sản Phẩm: ${activeBrand}` : "Bỏ Lọc Sản Phẩm"}
          </h3>
          <div className="product-list">
            {(activeBrand ? filteredProducts : products).map((product) => (
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
        </div>
      ) : (
        <h6></h6>
      )}

      {cartNotification && (
        <div className="cart-notification">
          <p>Sản phẩm đã được thêm vào giỏ hàng!</p>
        </div>
      )}
    </div>
  );
};

export default BrandFilter;
