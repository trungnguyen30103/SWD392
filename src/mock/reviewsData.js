import productsData from '../db/db.json'; // Giả sử chúng ta có thể import db.json trực tiếp

// Hàm để chuyển đổi dữ liệu reviews từ cấu trúc DB sang cấu trúc phù hợp với UI
export const processReviews = () => {
  const allReviews = [];
  const products = productsData.products || [];
  
  // Duyệt qua tất cả các reviews trong DB
  Object.keys(productsData.reviews || {}).forEach(productId => {
    const reviewsList = productsData.reviews[productId] || [];
    
    // Tìm thông tin sản phẩm
    const product = products.find(p => p.id === parseInt(productId));
    
    reviewsList.forEach(review => {
      const reviewData = {
        id: review.id,
        productId: review.product_id,
        productName: product ? product.name : `Product ${review.product_id}`,
        productImage: product ? product.imageUrl : "/images/placeholder.jpg",
        userId: review.user_id,
        userName: `User ${review.user_id}`, // Thông tin người dùng có thể lấy từ DB.users
        userEmail: `user${review.user_id}@example.com`,
        rating: review.rating,
        comment: review.review_text,
        date: review.created_at,
        // Thêm trường status mặc định là "approved" nếu không có trong DB
        status: "approved", // Giả định tất cả đánh giá trong DB đã được duyệt
        helpful: Math.floor(Math.random() * 30) // Tạo số ngẫu nhiên cho field 'helpful'
      };
      
      allReviews.push(reviewData);
    });
  });
  
  // Thêm một số mock reviews với các status khác nhau để minh họa chức năng duyệt
  const mockReviews = [
    {
      id: 100,
      productId: 1,
      productName: "Labubu Classic",
      productImage: "https://bizweb.dktcdn.net/100/467/909/products/1-kcsywtj3yu-1200x1200.jpg?v=1733894836057",
      userId: 201,
      userName: "Nguyễn Văn A",
      userEmail: "nguyenvana@example.com",
      rating: 5,
      comment: "Sản phẩm tuyệt vời, packaging rất đẹp và chất lượng cao!",
      date: "2023-12-15T08:30:00",
      status: "pending",
      helpful: 12
    },
    {
      id: 101,
      productId: 2,
      productName: "Labubu Halloween Edition",
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-7r98q-ly0o4tghh80fbb",
      userId: 202,
      userName: "Trần Thị B",
      userEmail: "tranthib@example.com",
      rating: 2,
      comment: "Sản phẩm không như quảng cáo, màu sắc khác xa so với hình. Thất vọng.",
      date: "2023-12-12T14:45:00",
      status: "pending",
      helpful: 5
    },
    {
      id: 102,
      productId: 3,
      productName: "Labubu Mini",
      productImage: "https://product.hstatic.net/200000863773/product/remove-bg.ai_1724309504528_e64e21fdaf6f47339b2c211e441a66a2_master.png",
      userId: 203,
      userName: "Lê Văn C",
      userEmail: "levanc@example.com",
      rating: 1,
      comment: "Nhân vật bị lỗi, gãy chân khi mới mở hộp. Rất thất vọng với chất lượng.",
      date: "2023-12-10T09:15:00",
      status: "rejected",
      helpful: 8
    },
  ];
  
  return [...mockReviews, ...allReviews];
};

// Export mock reviews đã xử lý
export const mockReviews = processReviews();
