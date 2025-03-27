import React, { useState, useEffect } from "react";
import "./index.css";
import Container from "../../component/Container";

const GachaBlindbox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false); // Thêm state để kiểm tra có quay hay không

  const sampleItems = [
    { name: "Golden Dragon", imageUrl: "blb.png", rarity: "Legendary" },
    { name: "Silver Sword", imageUrl: "blb1.png", rarity: "Epic" },
    { name: "Mystic Shield", imageUrl: "blb2.png", rarity: "Rare" },
    { name: "Iron Helm", imageUrl: "blb3.png", rarity: "Uncommon" },
    { name: "Wooden Staff", imageUrl: "gacha2.png", rarity: "Common" },
  ];

  useEffect(() => {
    setItems([]);
  }, []);

  const getRandomItem = () => {
    const random = Math.random();
    if (random < 0.01) {
      return sampleItems.find((item) => item.rarity === "Legendary");
    } else if (random < 0.13) {
      return sampleItems.find((item) => item.rarity === "Epic");
    } else if (random < 0.33) {
      return sampleItems.find((item) => item.rarity === "Rare");
    } else if (random < 0.73) {
      return sampleItems.find((item) => item.rarity === "Uncommon");
    } else {
      return sampleItems.find((item) => item.rarity === "Common");
    }
  };

  const openGacha = async (numDraws) => {
    if (balance < numDraws * 10) {
      setError("Not enough balance to spin.");
      return;
    }

    setIsSpinning(true); // Bắt đầu quay
    setIsLoading(true);
    setError(null);

    // Thêm âm thanh quay
    const spinSound = new Audio("spin-sound.mp3"); // Đảm bảo có file âm thanh này
    spinSound.play();

    const drawnItems = [];
    for (let i = 0; i < numDraws; i++) {
      drawnItems.push(getRandomItem());
    }
    const capsule = document.querySelector(".gacha-capsule");
    capsule.classList.add("spin");
    setTimeout(() => {
      setItems(drawnItems);
      setBalance(balance - numDraws * 10);
      setSpinCount((prevCount) => (prevCount + numDraws) % 100);
      setIsLoading(false);
      setIsSpinning(false);
      capsule.classList.remove("spin"); // Loại bỏ class 'spin' để dừng quay
    }, 5000);
  };

  const handleClickOk = () => {
    setItems([]);
  };

  return (
    <Container>
      <div className="gacha-blindbox-container">
        <h1 className="gacha-title">BlindBox Frenzy GaCha</h1>

        <div className="balance-display">
          <p>Balance: ${balance}</p>
        </div>

        <div className="spin-progress">
          <label>Spins: {spinCount}</label>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ height: `${(spinCount / 100) * 100}%` }}
            ></div>
          </div>
          <div className="milestone">25</div>
          <div className="milestone milestone-50">50</div>
          <div className="milestone milestone-100">100</div>
        </div>

        <div
          className={`gacha-capsule ${
            isLoading ? "gacha-loading fast-spin" : ""
          }`}
        >
          {isLoading ? (
            <div className="gacha-loading-spinner"></div>
          ) : (
            <img src="gacha4.png" alt="Gacha Icon" />
          )}
        </div>

        <div className="gacha-buttons">
          <button
            onClick={() => openGacha(1)}
            disabled={isLoading || balance < 10}
            className="gacha-button"
          >
            {isLoading ? "Opening..." : "Spin 1 Time"}
          </button>
          <button
            onClick={() => openGacha(5)}
            disabled={isLoading || balance < 50}
            className="gacha-button"
          >
            {isLoading ? "Opening..." : "Spin 5 Times"}
          </button>
        </div>

        {items.length > 0 && (
          <div className="gacha-results">
            {items.map((item, index) => (
              <div
                key={index}
                className={`gacha-result ${
                  item.rarity === "Common"
                    ? "gacha-item-common"
                    : item.rarity === "Uncommon"
                    ? "gacha-item-uncommon"
                    : item.rarity === "Rare"
                    ? "gacha-item-rare"
                    : item.rarity === "Epic"
                    ? "gacha-item-epic"
                    : item.rarity === "Legendary"
                    ? "gacha-item-legendary"
                    : ""
                }`}
              >
                <h3 className="gacha-item-name"> {item.name}</h3>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="gacha-item-image"
                />
              </div>
            ))}
          </div>
        )}

        {error && <p className="gacha-error">{error}</p>}

        {items.length > 0 && (
          <div className="gacha-actions">
            <button onClick={handleClickOk} className="gacha-action-button">
              Ok
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default GachaBlindbox;
