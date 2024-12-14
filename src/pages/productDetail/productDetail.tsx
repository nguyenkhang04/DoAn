import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actFetchProductById } from "../redux/features/product/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import "./styles.scss";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = useSelector((state: RootState) => state.product.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actFetchProductById(productId as string));
  }, [dispatch, productId]);

  if (!product) {
    return <h1>No Product found</h1>;
  }

  return (
    <div className="product-detail-page">
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
          </div>
          <div className="storage-options">
            <label>Dung lượng: </label>
            <button className="storage-option">128 GB</button>
          </div>
        </div>

        <div className="promotion">
          <h3>Khuyến mãi nổi bật</h3>
          <p>Giảm ngay 300.000đ khi mua sản phẩm này.</p>
        </div>

        <div className="product-actions">
          <button className="buy-now">Mua ngay</button>
          <button className="add-to-cart">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
