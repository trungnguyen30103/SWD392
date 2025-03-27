import React from "react";
import "./index.css";
import Container from "../../component/Container";

const TopUpPage = ({ balance, setBalance }) => {
  const topUpOptions = [100, 200, 500, 1000, 3000];

  const handleTopUp = (amount) => {
    setBalance((prev) => prev + amount);
    alert(`Bạn đã nạp thành công ${amount} vào tài khoản!`);
  };

  return (
    <Container>
      <div className="topup-container">
        <h1 className="topup-title">Nạp xu để quay BlindBox</h1>
        <div className="topup-balance">Số dư hiện tại: ${balance}</div>

        <div className="topup-options">
          {topUpOptions.map((amount, index) => (
            <button
              key={index}
              onClick={() => handleTopUp(amount)}
              className="topup-button"
            >
              Nạp ${amount}
            </button>
          ))}
        </div>

        <p className="topup-note">Mỗi lần quay Gacha tốn 10 xu</p>
      </div>
    </Container>
  );
};

export default TopUpPage;
