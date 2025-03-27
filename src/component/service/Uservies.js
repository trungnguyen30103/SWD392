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

// Hàm lấy tất cả các sản phẩm
export const getProducts = () => {
  return api.get('/blindboxes');  // Lấy tất cả sản phẩm từ API
};

// Hàm lấy sản phẩm theo danh mục
export const getProductsByCategory = (category) => {
  return api.get(`/blindboxes/category/${category}`);  // Lấy sản phẩm theo danh mục
};

// Hàm lấy một sản phẩm theo ID
export const getProductById = (productId) => {
  return api.get(`/blindboxes/${productId}`);  // Lấy sản phẩm theo ID
};

// Hàm tạo một sản phẩm mới
export const createProduct = (product) => {
  return api.post('/blindboxes', product);  // Tạo một sản phẩm mới
};

// Hàm cập nhật sản phẩm
export const updateProduct = (productId, product) => {
  return api.put(`/blindboxes/${productId}`, product);  // Cập nhật sản phẩm
};

// Hàm xóa một sản phẩm
export const deleteProduct = (productId) => {
  return api.delete(`/blindboxes/${productId}`);  // Xóa sản phẩm theo ID
};

// Hàm lấy tất cả danh mục
export const getCategories = () => {
  return api.get('/api/categories');  // Lấy tất cả danh mục từ API
};

// Hàm lấy danh mục theo ID
export const getCategoryById = (categoryId) => {
  return api.get(`/api/categories/${categoryId}`);  // Lấy danh mục theo ID
};

// Hàm tạo một danh mục mới
export const createCategory = (category) => {
  return api.post('/api/categories', category);  // Tạo một danh mục mới
};

// Hàm cập nhật danh mục
export const updateCategory = (categoryId, category) => {
  return api.put(`/api/categories/${categoryId}`, category);  // Cập nhật danh mục
};

// Hàm xóa danh mục
export const deleteCategory = (categoryId) => {
  return api.delete(`/api/categories/${categoryId}`);  // Xóa danh mục theo ID
};

// Hàm lấy tất cả các bình luận (reviews)
export const getReviews = () => {
  return api.get('/reviews');  // Lấy tất cả các bình luận từ API
};

// Hàm lấy bình luận theo ID
export const getReviewById = (reviewId) => {
  return api.get(`/reviews/${reviewId}`);  // Lấy bình luận theo ID
};

// Hàm tạo bình luận mới
export const createReview = (review) => {
  return api.post('/reviews', review);  // Tạo bình luận mới
};

// Hàm cập nhật bình luận
export const updateReview = (reviewId, review) => {
  return api.put(`/reviews/${reviewId}`, review);  // Cập nhật bình luận
};

// Hàm xóa bình luận
export const deleteReview = (reviewId) => {
  return api.delete(`/reviews/${reviewId}`);  // Xóa bình luận theo ID
};

// Hàm lấy tất cả các đơn hàng
export const getOrders = () => {
  return api.get('/api/orders');  // Lấy tất cả các đơn hàng từ API
};

// Hàm lấy đơn hàng theo ID
export const getOrderById = (orderId) => {
  return api.get(`/api/orders/${orderId}`);  // Lấy đơn hàng theo ID
};

// Hàm tạo đơn hàng mới
export const createOrder = (order) => {
  return api.post('/api/orders', order);  // Tạo đơn hàng mới
};

// Hàm cập nhật đơn hàng
export const updateOrder = (orderId, order) => {
  return api.put(`/api/orders/${orderId}`, order);  // Cập nhật đơn hàng
};

// Hàm xóa đơn hàng
export const deleteOrder = (orderId) => {
  return api.delete(`/api/orders/${orderId}`);  // Xóa đơn hàng theo ID
};

// Hàm lấy tất cả các người dùng
export const getUsers = () => {
  return api.get('/api/users');  // Lấy tất cả người dùng từ API
};

// Hàm lấy người dùng theo ID
export const getUserById = (userId) => {
  return api.get(`/api/users/${userId}`);  // Lấy người dùng theo ID
};

// Hàm tạo người dùng mới
export const createUser = (user) => {
  return api.post('/api/users', user);  // Tạo người dùng mới
};

// Hàm cập nhật người dùng
export const updateUser = (userId, user) => {
  return api.put(`/api/users/${userId}`, user);  // Cập nhật người dùng
};

// Hàm xóa người dùng
export const deleteUser = (userId) => {
  return api.delete(`/api/users/${userId}`);  // Xóa người dùng theo ID
};

// Hàm xử lý thanh toán
export const processPayment = (paymentRequest) => {
  return api.post('/payment/process', paymentRequest);  // Xử lý thanh toán
};
