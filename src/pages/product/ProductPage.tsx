import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Spin, Input, Collapse, Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { actFetchAllProducts } from "../redux/features/product/productSlice";
import { addToCart } from "../redux/features/product/cartSlice";
import "./styles.scss";

const { Panel } = Collapse;
const { Option } = Select;

type Filters = {
  manufacturers: string[];
  priceRange:
    | "all"
    | "under500"
    | "500to1M"
    | "1Mto5M"
    | "5Mto10M"
    | "over10M"
    | "custom";
  customPriceRange: [number, number];
};

const ProductPage = () => {
  const { loading, products } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();

  const [filters, setFilters] = useState<Filters>({
    manufacturers: [],
    priceRange: "all",
    customPriceRange: [0, 5000000],
  });
  const [animateButton, setAnimateButton] = useState<string | null>(null);
  const [cartNotification, setCartNotification] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("none");

  useEffect(() => {
    dispatch(actFetchAllProducts({}));
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    setAnimateButton(product.id);
    setCartNotification(true);

    setTimeout(() => setCartNotification(false), 3000);
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterToggle = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const handleManufacturerChange = (checkedValues: string[]) => {
    setFilters({ ...filters, manufacturers: checkedValues });
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.category === "phone" &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.manufacturers.length === 0 ||
        filters.manufacturers.includes(product.brand)) &&
      (filters.priceRange === "all" ||
        (filters.priceRange === "under500" && product.price < 500000) ||
        (filters.priceRange === "500to1M" &&
          product.price >= 500000 &&
          product.price <= 1000000) ||
        (filters.priceRange === "1Mto5M" &&
          product.price >= 1000000 &&
          product.price <= 5000000) ||
        (filters.priceRange === "5Mto10M" &&
          product.price > 5000000 &&
          product.price <= 10000000) ||
        (filters.priceRange === "over10M" && product.price > 10000000) ||
        (filters.priceRange === "custom" &&
          product.price >= filters.customPriceRange[0] &&
          product.price <= filters.customPriceRange[1]))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  const displayedProducts = showAll
    ? sortedProducts
    : sortedProducts.slice(0, 8);

  return (
    <div className="home-page">
      {loading && <Spin />}
      <h2>Điện Thoại</h2>
      <div className="filter-product-container">
        <div className="filter-toggle-container">
          <Button onClick={handleFilterToggle}>Bộ Lọc Sản Phẩm</Button>
          {showFilterOptions && (
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Lọc theo giá" key="1">
                <Button
                  onClick={() => setFilters({ ...filters, priceRange: "all" })}
                >
                  Tất cả
                </Button>
                <Button
                  onClick={() =>
                    setFilters({ ...filters, priceRange: "under500" })
                  }
                >
                  Dưới 500K
                </Button>
                <Button
                  onClick={() =>
                    setFilters({ ...filters, priceRange: "500to1M" })
                  }
                >
                  500K - 1M
                </Button>
                <Button
                  onClick={() =>
                    setFilters({ ...filters, priceRange: "1Mto5M" })
                  }
                >
                  Từ 1M đến 5M
                </Button>
                <Button
                  onClick={() =>
                    setFilters({ ...filters, priceRange: "5Mto10M" })
                  }
                >
                  Từ 5M đến 10M
                </Button>
                <Button
                  onClick={() =>
                    setFilters({ ...filters, priceRange: "over10M" })
                  }
                >
                  Trên 10M
                </Button>
              </Panel>

              <Panel header="Lọc theo hãng" key="2">
                <Checkbox.Group
                  options={[
                    "Iphone",
                    "Samsung",
                    "Oppo",
                    "Poco",
                    "Xiaomi",
                    "Nokia",
                    "Honor",
                  ]}
                  onChange={(checkedValues) =>
                    handleManufacturerChange(checkedValues as string[])
                  }
                />
              </Panel>
            </Collapse>
          )}
        </div>

        <div className="search-container">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-select"
            placeholder="Sắp xếp theo giá"
          >
            <Option value="none">Không sắp xếp</Option>
            <Option value="asc">Giá tăng dần</Option>
            <Option value="desc">Giá giảm dần</Option>
          </Select>
        </div>
      </div>

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

export default ProductPage;
