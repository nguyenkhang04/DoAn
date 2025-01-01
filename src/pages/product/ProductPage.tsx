import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Spin, Button, Input, Select, Checkbox, Collapse } from "antd";
import { productApis } from "../../apis/productApis";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/product/cartSlice";
import "./styles.scss";

const { Panel } = Collapse;
const { Option } = Select;

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    manufacturers: [] as string[],
    priceRange: "all" as string,
    customPriceRange: [0, 5000000] as [number, number],
  });
  const [sortOrder, setSortOrder] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("categoryId");

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productApis.getAllProducts({ categoryId });
        setProducts(response);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleAddToCart = (product: any) => {
    console.log("Đang thêm vào giỏ hàng:", product);
    dispatch(addToCart(product));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const handleManufacturerChange = (checkedValues: string[]) => {
    setFilters({ ...filters, manufacturers: checkedValues });
  };

  const handlePriceRangeChange = (value: string) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleToggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleShowMore = (category: string) => {
    if (category === "phone") {
      setShowMore(!showMore);
    }
  };

  const filteredProducts = products.filter((product) => {
    const isManufacturerMatched =
      filters.manufacturers.length === 0 ||
      filters.manufacturers.includes(product.brandId.toString());

    const isPriceRangeMatched =
      filters.priceRange === "all" ||
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
        product.price <= filters.customPriceRange[1]);

    const isSearchQueryMatched = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isManufacturerMatched && isPriceRangeMatched && isSearchQueryMatched;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  if (loading) {
    return <Spin size="large" />;
  }

  const brands = [
    { id: 1, name: "Iphone" },
    { id: 2, name: "Samsung" },
    { id: 3, name: "Oppo" },
    { id: 4, name: "Poco" },
    { id: 5, name: "Xiaomi" },
    { id: 6, name: "Nokia" },
    { id: 7, name: "Honor" },
    { id: 8, name: "Anker" },
    { id: 9, name: "Pisen" },
    { id: 10, name: "Apple" },
    { id: 11, name: "HP" },
    { id: 12, name: "Dell" },
    { id: 13, name: "Microsoft" },
  ];

  return (
    <div className="product-page">
      <h1>Sản phẩm</h1>

      <div className="sort-container">
        <Button onClick={handleToggleFilterOptions}>Bộ Lọc</Button>
        <Input
          className="search-input"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Select
          className="sort-select"
          value={sortOrder}
          onChange={handleSortChange}
          placeholder="Sắp xếp theo giá"
        >
          <Option value="none">Không sắp xếp</Option>
          <Option value="asc">Giá tăng dần</Option>
          <Option value="desc">Giá giảm dần</Option>
        </Select>
      </div>

      {showFilterOptions && (
        <div className="filter-options">
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Lọc theo giá" key="1">
              <Button onClick={() => handlePriceRangeChange("all")}>
                Tất cả
              </Button>
              <Button onClick={() => handlePriceRangeChange("under500")}>
                Dưới 500K
              </Button>
              <Button onClick={() => handlePriceRangeChange("500to1M")}>
                500K - 1M
              </Button>
              <Button onClick={() => handlePriceRangeChange("1Mto5M")}>
                Từ 1M đến 5M
              </Button>
              <Button onClick={() => handlePriceRangeChange("5Mto10M")}>
                Từ 5M đến 10M
              </Button>
              <Button onClick={() => handlePriceRangeChange("over10M")}>
                Trên 10M
              </Button>
            </Panel>
            <Panel header="Lọc theo hãng" key="2">
              <Checkbox.Group
                options={brands.map((brand) => ({
                  label: brand.name,
                  value: brand.id.toString(),
                }))}
                onChange={handleManufacturerChange}
              />
            </Panel>
          </Collapse>
        </div>
      )}

      <div className="product-list">
        {sortedProducts.length === 0 ? (
          <p>Không có sản phẩm trong danh mục này.</p>
        ) : (
          sortedProducts
            .slice(0, showMore ? sortedProducts.length : 8)
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
                    <p className="product-description">{product.description}</p>
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
        {showMore ? "Ẩn bớt" : "Xem thêm"}
      </button>

      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
};

export default ProductPage;
