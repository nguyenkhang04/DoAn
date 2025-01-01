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
  
      <div className="endowendow">
        <h5>Ưu đãi thêm</h5>
        <p>Giảm 50.000đ cho khách quen đã mua hàng tại Phone VN</p>
        <p>Ưu đãi Học sinh - sinh viên giảm ngay 50.000đ</p>
        <p>Tài xế xe công nghệ - Hỗ trợ giảm ngay 50.000đ</p>
      </div>
  
      <div className="WarrantyPolicy">
        <h5>Chính Sách Bảo Hành</h5>
        <p>
          Bảo hành chính hãng 18 tháng ( Miễn phí ): - Lỗi là đổi trong 30
          ngày - Bảo hành 18 tháng theo chính sách bảo hành của hãng
        </p>
        <p>
          Gia hạn bảo hành 24 tháng (+1.000.000đ): - Lỗi là đổi trong 30 ngày
          - 18 Tháng đầu BH tại hãng và BH Rơi vỡ - Vào nước 12 tháng tại
          Phone VN - 6 Tháng sau bảo hành toàn bộ máy tại Phone VN
        </p>
      </div>
  
      <div className="product-review">
        <ProductReview />
      </div>
    </div>
  </div>  
  );
};

export default ProductDetailPage;
