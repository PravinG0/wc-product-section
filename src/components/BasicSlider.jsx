import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BasicSlider.css';

const BasicSlider = () => {
  const slides = [
    'https://funiro-landing-page.netlify.app/4ec15ac0608ccc2c4fe0.jpg',
    'https://funiro-landing-page.netlify.app/e037190f77e19b703821.jpg',
    'https://funiro-landing-page.netlify.app/af83e499a6579d57973a.jpg',
    'https://funiro-landing-page.netlify.app/4ec15ac0608ccc2c4fe0.jpg',
    'https://funiro-landing-page.netlify.app/e037190f77e19b703821.jpg',
    'https://funiro-landing-page.netlify.app/af83e499a6579d57973a.jpg',
  ];

  return (
    <div className="slider-container">
      <div className="slider-text">
        <div className="slider-text-inner">
          <h1>50+ Beautiful rooms inspiration</h1>
          <p>
            Our designer already made a lot of beautiful prototype of rooms that inspire you
          </p>
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="custom-swiper"
        speed={800}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BasicSlider;
