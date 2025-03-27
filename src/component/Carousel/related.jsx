/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { getBlindboxes } from "../service/Uservies";

import { BlindboxProduct  } from "../Cartd/BlindboxProduct.jsx";

export default function BlindboxRelate({
  numberOfSlides = 4,
  autoplay = false,
  rows = 1,
  category = "Blindbox",
  data = "blindboxes", // Đặt mặc định là "blindboxes"
  isNewest = false,
  showAllProducts = false,
  numberOfProducts = 10,
  showAllCategories = false,
}) {
  const swiperContainerStyle = {
    "--swiper-rows": rows,
    "--swiper-space-between": "30px",
  };
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    let res;
    if (data === "blindboxes") {
      res = await getBlindboxes(); // Lấy dữ liệu từ API blindbox
    }
    let sortedItems = res.data.data;
    if (isNewest) {
      sortedItems = sortedItems.sort((a, b) => {
        const dateA = new Date(a.createAt); // Cập nhật với trường ngày tạo trong blindbox
        const dateB = new Date(b.createAt); // Cập nhật với trường ngày tạo trong blindbox
        return dateB - dateA;
      });
    }
    setItems(sortedItems);
  };

  useEffect(() => {
    fetchItems();
  }, [data, isNewest]);

  const handleCardClick = () => {
    // Cuộn lên đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cho phép cuộn mượt mà
    });
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lọc các sản phẩm blindbox theo thể loại (nếu có)
  const filteredItems = items.filter((item) => {
    return showAllCategories || item.category.categoryName === category;
  });

  // Giới hạn số lượng sản phẩm nếu showAllProducts là false
  const displayedItems = showAllProducts
    ? filteredItems
    : filteredItems.slice(0, numberOfProducts);

  return (
    <div className="swiper-container" style={swiperContainerStyle}>
      <Swiper
        spaceBetween={30}
        slidesPerView={
          isMobile ? 1 : isTablet ? numberOfSlides - 2 : numberOfSlides
        }
        grid={{
          rows: rows,
        }}
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        modules={autoplay ? [Autoplay, Grid, Navigation] : [Grid, Navigation]}
        className={`blindbox-relate ${rows === 2 ? "multi-item" : ""}`}
      >
        {displayedItems
          .filter((item) => item.status === true)
          .map((item) => (
            <SwiperSlide key={item.blindboxID}>
              <div onClick={handleCardClick}>
                <BlindboxProduct blindbox={item} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
