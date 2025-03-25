import React from "react";
import "./index.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const WebsiteInfo = () => {
  return (
    <div className="info-container">
      <h1 className="title">Giới thiệu về BlindBox</h1>
      <p className="description">
        Tìm hiểu thêm về sứ mệnh của chúng tôi và cách chúng tôi mang lại niềm
        vui cho khách hàng.
      </p>

      <h2>Cách thức hoạt động</h2>
      <ul>
        <li>
          <strong>Chọn hộp Blind Box của bạn</strong> – Duyệt qua bộ sưu tập hộp
          blind box theo chủ đề của chúng tôi.
        </li>
        <li>
          <strong>Mua hàng và chờ giao hàng</strong> – Hoàn tất đơn hàng và tận
          hưởng sự mong chờ.
        </li>
        <li>
          <strong>Mở hộp và khám phá bất ngờ</strong> – Nhận gói hàng và khám
          phá các món đồ bí ẩn!
        </li>
      </ul>

      <h2>Tại sao chọn chúng tôi?</h2>
      <ul>
        <li>
          Niềm vui & Hứng thú – Tận hưởng cảm giác bất ngờ với mỗi lần mua.
        </li>
        <li>
          Sản phẩm chất lượng cao – Các hộp blind box của chúng tôi chứa những
          sản phẩm chất lượng và được chọn lọc kỹ lưỡng.
        </li>
        <li>
          Ưu đãi độc quyền – Nhận các sản phẩm phiên bản giới hạn và đặc biệt
          không có ở nơi khác.
        </li>
        <li>
          Hài lòng khách hàng – Chúng tôi coi trọng khách hàng và cam kết mang
          đến dịch vụ tốt nhất.
        </li>
      </ul>

      <h2>Cách mua</h2>
      <ol>
        <li>
          Đăng ký / Đăng nhập – Tạo tài khoản hoặc đăng nhập để bắt đầu mua sắm.
        </li>
        <li>
          Chọn hộp của bạn – Lựa chọn một hộp blind box theo sở thích của bạn.
        </li>
        <li>
          Thanh toán an toàn – Hoàn tất thanh toán với các phương thức tin cậy
          của chúng tôi.
        </li>
        <li>
          Theo dõi đơn hàng – Cập nhật chi tiết giao hàng theo thời gian thực.
        </li>
        <li>Mở hộp và tận hưởng!</li>
      </ol>

      <h2>Đánh giá từ khách hàng</h2>
      <p>
        "Tôi rất thích cảm giác không biết mình sẽ nhận được gì! Rất đáng thử!"
      </p>
      <p>"Sản phẩm chất lượng và giao hàng nhanh chóng!"</p>
      <p>
        "BlindBox Web chưa bao giờ làm tôi thất vọng. Thật vui khi được tham
        gia!"
      </p>

      <h2>Chính sách & Hỗ trợ</h2>
      <ul>
        <li>
          Thanh toán an toàn – Nhiều phương thức thanh toán với bảo mật cao.
        </li>
        <li>
          Vận chuyển & Đổi trả – Chính sách vận chuyển minh bạch và quy trình
          đổi trả dễ dàng.
        </li>
        <li>
          Hỗ trợ khách hàng – Cần giúp đỡ? Liên hệ với chúng tôi qua chat trực
          tiếp, email hoặc điện thoại.
        </li>
      </ul>

      <h2>Liên hệ với chúng tôi</h2>
      <p>Theo dõi chúng tôi trên các mạng xã hội:</p>
      <div className="social-links">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={30} />
        </a>
        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={30} />
        </a>
      </div>
      <p>
        Để giải đáp thắc mắc, vui lòng gửi email đến{" "}
        <strong>support@blindboxweb.com</strong>.
      </p>
    </div>
  );
};

export default WebsiteInfo;
