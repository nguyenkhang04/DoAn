import React, { useState } from "react";
import { Checkbox, Radio, InputNumber, Slider, Button } from "antd";
import "./styles.scss";

const manufacturers = ["Mobell", "Nokia", "Masstel", "Itel", "Inoi", "Viettel"];
const priceRanges = [
  { label: "Tất cả", value: "all" },
  { label: "Dưới 500 nghìn", value: "under500" },
  { label: "Từ 500 nghìn - 1 triệu", value: "500to1M" },
  { label: "Trên 1 triệu", value: "over1M" },
];

const ProductFilter = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [customPriceRange, setCustomPriceRange] = useState<[number, number]>([
    0, 5000000,
  ]);

  const handleManufacturerChange = (checkedValues: any) => {
    setSelectedManufacturers(checkedValues);
    onFilterChange({
      manufacturers: checkedValues,
      priceRange: selectedPriceRange,
      customPriceRange,
    });
  };

  const handlePriceRangeChange = (e: any) => {
    setSelectedPriceRange(e.target.value);
    onFilterChange({
      manufacturers: selectedManufacturers,
      priceRange: e.target.value,
      customPriceRange,
    });
  };

  const handleCustomPriceChange = (values: number | [number, number]) => {
    if (Array.isArray(values)) {
      setCustomPriceRange(values);
      onFilterChange({
        manufacturers: selectedManufacturers,
        priceRange: "custom",
        customPriceRange: values,
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedManufacturers([]);
    setSelectedPriceRange("all");
    setCustomPriceRange([0, 5000000]);
    onFilterChange({
      manufacturers: [],
      priceRange: "all",
      customPriceRange: [0, 5000000],
    });
  };

  return (
    <div className="product-filter">
      <h3>Bộ lọc tìm kiếm</h3>
      <div className="filter-section">
        <h4>Hãng sản xuất</h4>
        <Checkbox.Group
          options={manufacturers}
          value={selectedManufacturers}
          onChange={handleManufacturerChange}
        />
      </div>

      <div className="filter-section">
        <h4>Mức giá</h4>
        <Radio.Group
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          {priceRanges.map((range) => (
            <Radio key={range.value} value={range.value}>
              {range.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div className="filter-section">
        <h4>Hoặc nhập khoảng giá phù hợp với bạn:</h4>
        <Slider
          range
          min={0}
          max={5000000}
          step={10000}
          value={customPriceRange}
          onChange={(values) =>
            handleCustomPriceChange(values as [number, number])
          }
        />

        <div className="price-inputs">
          <InputNumber
            min={0}
            max={5000000}
            value={customPriceRange[0]}
            onChange={(value) =>
              handleCustomPriceChange([value || 0, customPriceRange[1]])
            }
          />
          <span>~</span>
          <InputNumber
            min={0}
            max={5000000}
            value={customPriceRange[1]}
            onChange={(value) =>
              handleCustomPriceChange([customPriceRange[0], value || 5000000])
            }
          />
        </div>
      </div>

      <Button type="primary" onClick={handleResetFilters} block>
        Xóa bộ lọc
      </Button>
    </div>
  );
};

export default ProductFilter;
