// api.js hoặc file chứa các hàm API của bạn
import api from "../../config/axios";

// Hàm login
export const loginApi = (email, password, recaptchaResponse) => {
  const payload = {
    email,
    password,
    recaptchaResponse,
  };
  console.log("API Request Payload:", payload);

  return api.post("public/login", payload); // Gọi API login
};

// ======================== Blindbox APIs ========================

export const getBlindboxes = () => api.get("/api/blindboxes");

export const getBlindboxById = (blindboxID) =>
  api.get(`/api/blindboxes/${blindboxID}`);

export const createBlindbox = (blindbox) =>
  api.post("/api/blindboxes", blindbox);

export const updateBlindbox = (blindboxID, blindbox) =>
  api.put(`/api/blindboxes/${blindboxID}`, blindbox);

export const deleteBlindbox = (blindboxID) =>
  api.delete(`/api/blindboxes/${blindboxID}`);

export const getBlindboxesByCategory = (categoryID) =>
  api.get(`/api/blindboxes/category/${categoryID}`);

export const getActiveBlindboxes = () =>
  api.get("/api/blindboxes/status/active");

export const getDisabledBlindboxes = () =>
  api.get("/api/blindboxes/status/disable");

export const getOutOfStockBlindboxes = () =>
  api.get("/api/blindboxes/status/out-of-stock");

export const searchBlindboxesByName = (name) =>
  api.get(`/api/blindboxes/search?name=${name}`);

// ======================== Gacha APIs ========================

export const openBlindbox = () => api.get("/api/gacha/open-box");

export const getGachaHistory = () => api.get("/api/gacha/history");

export const getGachaHistoryByUser = () =>
  api.get("/api/gacha/history/user");

// ======================== Order APIs ========================

export const createBlindboxOrder = (order) =>
  api.post("/api/orders/create-blindbox-order", order);

export const payBlindboxOrder = (orderData) =>
  api.post("/api/orders/pay-blindbox-order", orderData);

// ======================== Cart APIs ========================

export const getCartByUserId = (userId) =>
  api.get(`/api/carts/${userId}`);

export const addToCart = (userId, productId) =>
  api.post(`/api/carts/${userId}/add/${productId}`, null);

export const updateCartItem = (userId, productId, quantity) =>
  api.put(`/api/carts/${userId}/update/${productId}`, { quantity });

export const removeFromCart = (userId, productId) =>
  api.delete(`/api/carts/${userId}/remove/${productId}`);

export const clearCart = (userId) =>
  api.delete(`/api/carts/${userId}/clear`);

// ======================== Discount APIs ========================

export const getDiscounts = () => api.get("/api/discounts");

export const getDiscountById = (id) => api.get(`/api/discounts/${id}`);

export const createDiscount = (data) => api.post("/api/discounts", data);

export const updateDiscount = (id, data) =>
  api.put(`/api/discounts/${id}`, data);

export const deleteDiscount = (id) => api.delete(`/api/discounts/${id}`);

export const applyDiscountCode = (payload) =>
  api.post("/api/discounts/apply", payload);

// ======================== Review APIs ========================

export const getReviews = () => api.get("/reviews");

export const getReviewById = (id) => api.get(`/reviews/${id}`);

export const createReview = (review) => api.post("/reviews", review);

export const updateReview = (id, review) => api.put(`/reviews/${id}`, review);

export const deleteReview = (id) => api.delete(`/reviews/${id}`);
