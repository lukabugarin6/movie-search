import React, { useEffect, useRef, useState, useContext } from "react";
import { MoviesContext } from "../../context/MoviesContext";
import LeftArrow from "../LeftArrow";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./index.css";

// import required modules
import { Navigation } from "swiper";

const Slider = ({ slides }) => {
  const { movies } = useContext(MoviesContext);
  const [swiper, setSwiper] = useState();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    swiper && swiper.slideTo(0, 0);
  }, [movies, swiper]);

  return (
    <>
      <div style={{ overflowX: "hidden", position: "relative" }}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={18}
          allowTouchMove={false}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
          modules={[Navigation]}
          className="mySwiper"
        >
          {slides &&
            slides.length > 0 &&
            slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`slideWrapper`}
                  style={{
                    backgroundImage: `url(${slide.Poster})`,
                    position: "relative",
                  }}
                >
                  <div className="card-overlay">
                      <h5>{slide.Title}</h5>
                      <h6>{slide.Year}</h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div
          className="slider-arrow slider-arrow--left"
          style={{ position: "absolute", left: 10, top: "50%", zIndex: 10 }}
          ref={navigationPrevRef}
        >
          <LeftArrow />
        </div>
        <div
          className="slider-arrow slider-arrow--right"
          style={{ position: "absolute", right: 10, top: "50%", zIndex: 10 }}
          ref={navigationNextRef}
        >
          <LeftArrow />
        </div>
      </div>
    </>
  );
};

export default Slider;
