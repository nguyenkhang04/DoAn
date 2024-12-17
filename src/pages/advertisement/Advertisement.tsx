import React, { useState, useEffect } from "react";
import "./styles.scss";

const Advertisement: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: "https://clickbuy.com.vn/uploads/media/682-yLCEc.png", caption: "" },
    { img: "https://clickbuy.com.vn/uploads/media/681-MUOth.png", caption: "" },
    { img: "https://clickbuy.com.vn/uploads/media/665-esGCy.png", caption: "" },
  ];

  const plusSlides = (n: number) => {
    setCurrentSlide((prevSlide) => (prevSlide + n + slides.length) % slides.length);
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
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mySlides fade ${index === currentSlide ? "active" : ""}`}
          >
            <div className="numbertext">{index + 1} / {slides.length}</div>
            <img src={slide.img} alt={slide.caption} style={{ width: "100%" }} />
            <div className="text">{slide.caption}</div>
          </div>
        ))}

        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
      <br />

      <div style={{ textAlign: "center" }}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => currentSlideHandler(index)}
          ></span>
        ))}
      </div>
      <div className="Advertisement-1">
        <img src="https://clickbuy.com.vn/uploads/media/657-oKxHy.png" alt="promo4" />
      </div>
    </div>
  );
};

export default Advertisement;
