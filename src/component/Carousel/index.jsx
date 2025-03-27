// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./index.css";
export default function Carousel() {
  return (
    <Swiper
      spaceBetween={30}  // Khoảng cách giữa các slide
      centeredSlides={true}  // Trung tâm các slide
      autoplay={{
        delay: 2500,  // Thời gian chờ giữa các slide (2.5 giây)
        disableOnInteraction: false,  // Không tắt autoplay khi người dùng tương tác
      }}
      pagination={{
        clickable: true,  // Cho phép nhấp vào pagination để chuyển slide
      }}
      navigation={true}  // Hiển thị các nút điều hướng (mũi tên trái phải)
      modules={[Autoplay, Pagination, Navigation]}  // Các module cần thiết
      className="carousel"
    >
      
      <SwiperSlide>
        <img
          src="slider_1.png"
          alt="Slide 1"
        />
      </SwiperSlide>

      
      <SwiperSlide>
        <img
          src="slider_2.png"
          alt="Slide 2"
        />
      </SwiperSlide>

     
      <SwiperSlide>
        <img
          src="slider_3.png"
          alt="Slide 3"
        />
      </SwiperSlide>

      
      <SwiperSlide>
        <img
          src="slider_4.png"
          alt="Slide 4"
        />
      </SwiperSlide>
    </Swiper>
  );
}
