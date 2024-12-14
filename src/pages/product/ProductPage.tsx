import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Spin } from "antd";
import { useEffect } from "react";
import { actFetchAllProducts } from "../redux/features/product/productSlice";
import "./styles.scss"

const ProductPage =()=>{
const { loading, products } = useSelector(
  (state: RootState) => state.product
);
const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(actFetchAllProducts({}));
}, [dispatch]);

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
      {products.map((_product) => (
        <div key={_product.id} className="product-card">
          <Link to={`/product/${_product.id}`} className="product-link">
            <img
              src={_product.img}
              alt={_product.name}
              className="product-image"
            />
            <div className="product-info">
              <h2 className="product-name">{_product.name}</h2>
              <p className="product-price">
                {_product.price.toLocaleString()} VND
              </p>
              <p className="product-description">{_product.description}</p>
              <p className="product-attribute">
                Thương hiệu: {_product.brand}
              </p>
            </div>
          </Link>
          <div className="btn-container">
            <Button type="primary" className="order-button">
              Mua ngay
            </Button>
            <Button type="primary" className="order-button">
              Thêm Vào Giỏ Hàng
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
export default ProductPage;
