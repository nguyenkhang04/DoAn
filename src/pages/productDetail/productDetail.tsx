import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { actFetchProductById } from "../redux/features/product/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import "./styles.scss";
import { addToCart } from "../redux/features/product/cartSlice";
import { Button, Spin } from "antd";
import ProductReview from "../productreview/ProductReview";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId");
  const brand = queryParams.get("brandId");
  const searchQuery = queryParams.get("search");

  const product = useSelector((state: RootState) => state.product.product);
  const loading = useSelector((state: RootState) => state.product.loading);
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);
  const [selectedColor, setSelectedColor] = useState<"white" | "black">(
    "white"
  );

  useEffect(() => {
    if (productId) {
      dispatch(actFetchProductById(productId as string));
    }
  }, [dispatch, productId]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(false), 3000);
  };

  const handleColorChange = (color: "white" | "black") => {
    setSelectedColor(color);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!product) {
    return <h1>Không tìm thấy sản phẩm</h1>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-page-container">
        <div className="product-images">
          <img
            src={product.subImgs[selectedColor]}
            alt={product.name}
            className="main-image"
          />
          <div className="thumbnail-images">
            {Object.keys(product.subImgs).map((color) => (
              <img
                key={color}
                src={product.subImgs[color as "white" | "black"]}
                alt={color}
                className="thumbnail"
                onClick={() => handleColorChange(color as "white" | "black")}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price.toLocaleString()} VND</p>

          <div className="color-selection">
            <h3>Màu sắc:</h3>
            <Button
              style={{
                padding: "15px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  selectedColor === "white" ? "#cb1c22" : "#f5f5f5",
                color: selectedColor === "white" ? "white" : "#333",
                boxShadow:
                  selectedColor === "white"
                    ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
              type={selectedColor === "white" ? "primary" : "default"}
              onClick={() => handleColorChange("white")}
            >
              Trắng
            </Button>
            <Button
              style={{}}
              type={selectedColor === "black" ? "primary" : "default"}
              onClick={() => handleColorChange("black")}
            >
              Đen
            </Button>
          </div>

          <div className="product-options">
            <div className="color-options"></div>
          </div>

          <div className="promotion">
            <h3>Khuyến mãi nổi bật</h3>
            <p>Giảm ngay 300.000đ khi mua sản phẩm này.</p>
          </div>

          <div className="product-actions">
            <Button
              type="primary"
              className={`order-button add-to-cart ${
                animateButton === product.id ? "animate" : ""
              }`}
              onClick={() => handleAddToCart(product)}
            >
              Thêm Vào Giỏ Hàng
            </Button>
            {cartNotification && (
              <div className="cart-notification">Đã thêm vào giỏ hàng!</div>
            )}
          </div>
        </div>

        <div className="ProductInformation">
          <h5>Thông tin sản phẩm</h5>
          <p>Máy mới chính hãng 100%</p>
          <p>Nguyên hộp, đầy đủ phụ kiện từ nhà sản xuất.</p>
          <p>
            Phụ kiện gồm: Cáp, sạc, que lấy sim, ốp lưng, sách hướng dẫn, phụ
            kiện bảo hành theo thời gian bao test
          </p>
          <p>Bảo hành chính hãng 18 tháng tại Xiaomi trên toàn quốc</p>
          <p>Lỗi là đổi trong 30 ngày</p>
        </div>

        <div className="product-review">
          <ProductReview />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
