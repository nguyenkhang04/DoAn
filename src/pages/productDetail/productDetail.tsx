import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actFetchProductById } from "../redux/features/product/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import "./styles.scss";
import { addToCart } from "../redux/features/product/cartSlice";
import { Button } from "antd";
import ProductReview from "../productreview/ProductReview";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = useSelector((state: RootState) => state.product.product);
  const dispatch = useDispatch<AppDispatch>();
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);

  useEffect(() => {
    dispatch(actFetchProductById(productId as string));
  }, [dispatch, productId]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(false), 3000);
  };

  if (!product) {
    return <h1>No Product found</h1>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-page-container">
        <div className="product-images">
          <img src={product.img} alt={product.name} className="main-image" />
          <div className="thumbnail-images">
            <img src={product.img} alt="Thumbnail" />
            <img src={product.img} alt="Thumbnail" />
            <img src={product.img} alt="Thumbnail" />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price.toLocaleString()} VND</p>

          <div className="product-options">
            <div className="color-options">
              <label>Màu sắc: </label>
              <button className="color-option">Xanh</button>
              <button className="color-option">Đen</button>
              <button className="color-option">Trắng</button>
            </div>
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
          </div>
        </div>
      </div>
      <div className="product-review">
        <ProductReview />
      </div>
    </div>
  );
};

export default ProductDetailPage;
