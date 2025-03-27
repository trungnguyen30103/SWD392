import React, { useState } from "react";  // Nhập React và useState từ thư viện React
import axios from "axios";  // Nhập axios để gửi yêu cầu HTTP
import { useNavigate } from "react-router-dom";  // Nhập useNavigate để điều hướng trang
import "./index.css";  // Nhập file CSS cho phần giao diện

const Register = () => {
  const navigate = useNavigate();  // Khởi tạo hook useNavigate để điều hướng đến các trang khác

  // Khai báo state cho dữ liệu form và thông báo lỗi
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: { roleID: 1 },  // Quyền người dùng mặc định là "customer"
    status: "active",  // Trạng thái người dùng là "active"
  });

  const [loading, setLoading] = useState(false);  // State lưu trữ trạng thái loading (đang xử lý)
  const [error, setError] = useState("");  // State lưu trữ lỗi tổng quát nếu có
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });  // State lưu trữ lỗi từng trường nhập liệu

  // Hàm xử lý khi người dùng thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;  // Lấy tên và giá trị của trường input
    setFormData({
      ...formData,
      [name]: value,  // Cập nhật giá trị của trường tương ứng trong formData
    });

    // Kiểm tra và xác thực trường vừa thay đổi
    validateField(name, value);  // Đảm bảo rằng validation sẽ được gọi
  };

  // Hàm xác thực từng trường dữ liệu nhập vào
  const validateField = (name, value) => {
    let errors = { ...fieldErrors };  // Sao chép đối tượng lỗi cũ
    let isValid = true;  // Mặc định là hợp lệ

    // Kiểm tra các trường nhập liệu và thiết lập thông báo lỗi nếu có
    switch (name) {
      case "fullName":
        if (!/^[\p{L}\s]+$/u.test(value)) {  // Kiểm tra chỉ chứa chữ cái và khoảng trắng
          errors.fullName = "Full Name must contain only letters";
          isValid = false;
        } else {
          errors.fullName = "";  // Nếu hợp lệ, xóa thông báo lỗi
        }
        break;

      case "userName":
        if (!value) {
          errors.userName = "Username is required. You will use this to log in.";  // Nếu không nhập username
          isValid = false;
        } else {
          errors.userName = "";  // Nếu hợp lệ, xóa thông báo lỗi
        }
        break;

      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {  // Kiểm tra định dạng email
          errors.email = "Email must be a valid address";
          isValid = false;
        } else {
          errors.email = "";  // Nếu hợp lệ, xóa thông báo lỗi
        }
        break;

      case "phone":
        if (!/^[0][0-9]{9}$/.test(value)) {  // Kiểm tra số điện thoại bắt đầu bằng 0 và dài 10 ký tự
          errors.phone = "Phone number must be 10 digits and start with 0";
          isValid = false;
        } else {
          errors.phone = "";  // Nếu hợp lệ, xóa thông báo lỗi
        }
        break;

      case "password":
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {  // Kiểm tra mật khẩu có ít nhất một chữ cái in hoa, một chữ cái thường, một số và một ký tự đặc biệt
          errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
          isValid = false;
        } else {
          errors.password = "";  // Nếu hợp lệ, xóa thông báo lỗi
        }
        break;

      case "confirmPassword":
        if (formData.password !== value) {  // Kiểm tra mật khẩu và xác nhận mật khẩu có giống nhau
          errors.confirmPassword = "Passwords must match";
          isValid = false;
        } else {
          errors.confirmPassword = "";  // Nếu hợp lệ, xóa thông báo lỗi
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);  // Cập nhật lại lỗi cho các trường nhập liệu
    return isValid;  // Trả về kết quả xác thực của trường
  };

  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();  // Ngăn chặn hành vi mặc định của form (trang sẽ không bị tải lại)

    // Kiểm tra tất cả các trường trước khi gửi
    const isValid = Object.keys(formData).every((field) =>
      validateField(field, formData[field])  // Kiểm tra từng trường hợp
    );
    if (!isValid) return;  // Dừng gửi nếu có trường không hợp lệ

    setLoading(true);  // Bắt đầu quá trình gửi dữ liệu (hiển thị loading)
    setError("");  // Xóa thông báo lỗi

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/customer",  // Gửi yêu cầu POST đến server
        formData,  // Dữ liệu người dùng nhập vào
        {
          withCredentials: true,  // Đảm bảo gửi cookie nếu có
        }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");  // Chuyển hướng người dùng đến trang đăng nhập nếu đăng ký thành công
    } catch (err) {
      // Xử lý lỗi nếu có
      if (err.response) {
        setError(
          `Registration failed: ${err.response.data.error || "Unknown error"}`
        );
      } else if (err.request) {
        setError(
          "No response from the server. Please check your internet connection."
        );
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error("Error during registration:", err);
    } finally {
      setLoading(false);  // Kết thúc quá trình gửi (dừng loading)
    }
  };

  // Kiểm tra xem tất cả các trường có hợp lệ để cho phép nút đăng ký
  const isFormValid = Object.values(fieldErrors).every((error) => error === "");  // Nếu tất cả lỗi là chuỗi rỗng, form hợp lệ

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Register</h2>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}  {/* Hiển thị thông báo lỗi nếu có */}

        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu với thông báo lỗi nếu có */}
          <div className="form-group">
            {fieldErrors.fullName && (
              <div className="error-message">{fieldErrors.fullName}</div>
            )}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.userName && (
              <div className="error-message">{fieldErrors.userName}</div>
            )}
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.email && (
              <div className="error-message">{fieldErrors.email}</div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.phone && (
              <div className="error-message">{fieldErrors.phone}</div>
            )}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.password && (
              <div className="error-message">{fieldErrors.password}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {fieldErrors.confirmPassword && (
              <div className="error-message">{fieldErrors.confirmPassword}</div>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading || !isFormValid}
          >
            {loading ? "Creating account..." : "Sign up now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
