import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const Advertisement: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { img: "https://clickbuy.com.vn/uploads/media/682-yLCEc.png", caption: "" },
    { img: "https://clickbuy.com.vn/uploads/media/681-MUOth.png", caption: "" },
    { img: "https://clickbuy.com.vn/uploads/media/665-esGCy.png", caption: "" },
  ];

  const plusSlides = (n: number) => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + n + slides.length) % slides.length
    );
  };

  const currentSlideHandler = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Advertisement-container">
      <div className="Advertisement-category">
        <div>
          <Link to={"/product"}>Điện Thoại</Link>
          <Link to={"/laptop"}>Laptop</Link>
          <Link to={"/accessory"}>Phụ Kiện</Link>
          <Link to={"/"}>Sửa Chữa</Link>
          <Link to={"/sound"}>Âm Thanh</Link>
          <Link to={"/about"}>Bảo Hành</Link>
        </div>
      </div>

      <div className="slideshow-wrapper">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`mySlides fade ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <img src={slide.img} alt={`Slide ${index}`} />
            </div>
          ))}
          <a className="prev" onClick={() => plusSlides(-1)}>
            &#10094;
          </a>
          <a className="next" onClick={() => plusSlides(1)}>
            &#10095;
          </a>
        </div>

        <div className="Advertisement-sidebar">
          <div className="ad-item">
            <img
              src="https://clickbuy.com.vn/uploads/media/657-oKxHy.png"
              alt="promo"
            />
          </div>
        </div>
      </div>

      <div className="Advertisement-promo">
        <div className="promo-item">
          <img
            src="https://clickbuy.com.vn/uploads/media/686-fEmoa.png"
            alt="sale"
          />
        </div>
        <div className="promo-item">
          <img
            src="https://clickbuy.com.vn/uploads/media/671-sKdOs.png"
            alt="promo"
          />
        </div>
        <div className="promo-item">
          <img
            src="https://clickbuy.com.vn/uploads/media/676-mNMfm.png"
            alt="promo"
          />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
