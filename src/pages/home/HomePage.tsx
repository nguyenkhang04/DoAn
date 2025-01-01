import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApis } from "../../apis/productApis";
import { Button } from "antd";
import "./styles.scss";
import Advertisement from "../advertisement/Advertisement";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/product/cartSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [phones, setPhones] = useState<any[]>([]);
  const [laptops, setLaptops] = useState<any[]>([]);
  const [accessories, setAccessories] = useState<any[]>([]);
  const [sounds, setsounds] = useState<any[]>([]);

  const [showMorePhones, setShowMorePhones] = useState(false);
  const [showMoreLaptops, setShowMoreLaptops] = useState(false);
  const [showMoreAccessories, setShowMoreAccessories] = useState(false);
  const [showMoreSounds, setShowMoreSounds] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const phoneResponse = await productApis.getAllProducts({
          categoryId: "1",
        });
        const laptopResponse = await productApis.getAllProducts({
          categoryId: "2",
        });
        const accessoryResponse = await productApis.getAllProducts({
          categoryId: "3",
        });
        const soundResponse = await productApis.getAllProducts({
          categoryId: "4",
        });

        setPhones(phoneResponse);
        setLaptops(laptopResponse);
        setAccessories(accessoryResponse);
        setsounds(soundResponse);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
      console.log("Đang thêm vào giỏ hàng:", product);
      dispatch(addToCart(product));
    };

  const toggleShowMore = (category: string) => {
    if (category === "phone") {
      setShowMorePhones(!showMorePhones);
    } else if (category === "laptop") {
      setShowMoreLaptops(!showMoreLaptops);
    } else if (category === "accessory") {
      setShowMoreAccessories(!showMoreAccessories);
    } else if (category === "sound") {
      setShowMoreSounds(!showMoreSounds);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <Advertisement></Advertisement>

      <div className="category-container">
        <h2>Điện thoại</h2>
        <div className="product-list">
          {phones.length === 0 ? (
            <p>Không có sản phẩm trong danh mục này.</p>
          ) : (
            phones
              .slice(0, showMorePhones ? phones.length : 8)
              .map((product) => (
                <div
                  key={`${product.id}-${product.name}`}
                  className="product-card"
                >
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="product-image"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>
                      <p className="product-price">
                        {product.price.toLocaleString()} VND
                      </p>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                  <Button
                    type="primary"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              ))
          )}
        </div>
        <button className="btnshowmore" onClick={() => toggleShowMore("phone")}>
          {showMorePhones ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>
      <div className="Tet-advertising">
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/480x0/filters:quality(100)/H3_405x175_4fdc4f2fc6.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H2_614x212_7_a0209cd3f9.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_2_7cd0eb3667.png"
          alt=""
        />
      </div>
      {/* Hiển thị sản phẩm laptop */}
      <div className="category-container">
        <h2>Laptop</h2>
        <div className="product-list">
          {laptops.length === 0 ? (
            <p>Không có sản phẩm trong danh mục này.</p>
          ) : (
            laptops
              .slice(0, showMoreLaptops ? laptops.length : 8)
              .map((product) => (
                <div
                  key={`${product.id}-${product.name}`}
                  className="product-card"
                >
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="product-image"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>
                      <p className="product-price">
                        {product.price.toLocaleString()} VND
                      </p>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                  <Button
                    type="primary"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              ))
          )}
        </div>
        <button className="btnshowmore" onClick={() => toggleShowMore("laptop")}>
          {showMoreLaptops ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>

      <div className="Tet-advertising">
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_8ff93cb7e6.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x175_71b225aaa3.png"
          alt=""
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/828x0/filters:quality(100)/H3_405x1753x_5ff720ef1c.png"
          alt=""
        />
      </div>

      {/* Hiển thị sản phẩm phụ kiện */}
      <div className="category-container">
        <h2>Phụ kiện</h2>
        <div className="product-list">
          {accessories.length === 0 ? (
            <p>Không có sản phẩm trong danh mục này.</p>
          ) : (
            accessories
              .slice(0, showMoreAccessories ? accessories.length : 4)
              .map((product) => (
                <div
                  key={`${product.id}-${product.name}`}
                  className="product-card"
                >
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="product-image"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>
                      <p className="product-price">
                        {product.price.toLocaleString()} VND
                      </p>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                  <Button
                    type="primary"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              ))
          )}
        </div>

        <button className="btnshowmore" onClick={() => toggleShowMore("accessory")}>
          {showMoreAccessories ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>

      <div className="category-container">
        <h2>Âm Thanh</h2>
        <div className="product-list">
          {sounds.length === 0 ? (
            <p>Không có sản phẩm trong danh mục này.</p>
          ) : (
            sounds
              .slice(0, showMoreSounds ? sounds.length : 4)
              .map((product) => (
                <div
                  key={`${product.id}-${product.name}`}
                  className="product-card"
                >
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="product-image"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>
                      <p className="product-price">
                        {product.price.toLocaleString()} VND
                      </p>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                  <Button
                    type="primary"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              ))
          )}
        </div>
        <button className="btnshowmore" onClick={() => toggleShowMore("accessory")}>
          {showMoreAccessories ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>

      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
};

export default HomePage;
