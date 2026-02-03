import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  EffectCube,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Picture from "../picture/Picture.jsx";
import styles from "./slider.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Slider = ({ images = [], customStyles = {} }) => {
  const swiperRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);

  if (!images || images.length === 0) return null;

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      setIsAtEnd(swiper.isEnd);
      setIsAtStart(swiper.isBeginning);
    }
  };

  return (
    <div className={styles.slider_wrapper} style={customStyles}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: `.${styles.swiper_button_next}`,
          prevEl: `.${styles.swiper_button_prev}`,
        }}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor
        className={styles.swiper_container}
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`slide-${index}`} className={styles.swiper_slide}>
            <Picture
              src={image.src || image}
              customStyles={{
                width: "100%",
                height: "100%",
                borderRadius: "0.3rem",
              }}
            />
          </SwiperSlide>
        ))}
        <button className={styles.swiper_button_prev} disabled={isAtStart}>
          <ChevronLeft size={18} />
        </button>
        <button className={styles.swiper_button_next} disabled={isAtEnd}>
          <ChevronRight size={18} />
        </button>
      </Swiper>
    </div>
  );
};

export default Slider;
