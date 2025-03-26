// api.js hoặc file chứa các hàm API của bạn
import api from "../../config/axios";

// Hàm login
export const loginApi = (email, password, recaptchaResponse) => {
  const payload = {
    email,
    password,
  };
  console.log("API Request Payload:", payload);

  return api.post("public/login", payload); // Gọi API login
};

// Hàm lấy tất cả các sản phẩm
export const getProducts = () => {
  return api.get('/blindboxes');  // Lấy tất cả sản phẩm từ API
};

// Hàm lấy sản phẩm theo danh mục
export const getProductsByCategory = (category) => {
  return api.get(`/blindboxes/${category}`);  // Lấy sản phẩm theo danh mục
};



