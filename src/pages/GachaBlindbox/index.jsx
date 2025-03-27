import React, { useState, useEffect } from "react";
import './index.css';
import Container from '../../component/Container';

const GachaBlindbox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);  // To store the results of the gacha draws
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(9999999999999999999999999999);  // Initial balance of the user (example 50 USD)

  // Sample data for gacha items
  const sampleItems = [
    {
      name: "Golden Dragon",
      imageUrl: "blb.png",
      rarity: "Legendary"
    },
    {
      name: "Silver Sword",
      imageUrl: "blb1.png",
      rarity: "Epic"
    },
    {
      name: "Mystic Shield",
      imageUrl: "blb2.png",
      rarity: "Rare"
    },
    {
      name: "Iron Helm",
      imageUrl: "blb3.png",
      rarity: "Uncommon"
    },
    {
      name: "Wooden Staff",
      imageUrl: "gacha2.png",
      rarity: "Common"
    }
  ];

  // Simulate fetching data
  useEffect(() => {
    setItems([]);  // Empty items initially to not show results when page loads
  }, []);

  // Function to simulate the opening of the gacha
  const getRandomItem = () => {
    const randomNum = Math.random() * 100; // Random number between 0 and 100
    if (randomNum < 1) {
      return sampleItems.find(item => item.rarity === "Legendary");
    } else if (randomNum < 6) {
      return sampleItems.find(item => item.rarity === "Epic");
    } else if (randomNum < 36) {
      return sampleItems.find(item => item.rarity === "Rare");
    } else if (randomNum < 76) {
      return sampleItems.find(item => item.rarity === "Uncommon");
    } else {
      return sampleItems.find(item => item.rarity === "Common");
    }
  };

  // Function to open gacha and simulate getting random items
  const openGacha = async (numDraws) => {
    if (balance < numDraws * 10) {
      setError("Not enough balance to spin.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const drawnItems = [];
    for (let i = 0; i < numDraws; i++) {
      drawnItems.push(getRandomItem());
    }

    setTimeout(() => {
      setItems(drawnItems);
      setBalance(balance - numDraws * 10);  // Deduct balance based on the number of draws
      setIsLoading(false);
    }, 2000);  // simulate loading time
  };

  const handleClickOk = () => {
    setItems([]); // Reset items before next spin
  };

  return (
    <Container>
      <div className="gacha-blindbox-container">
        <h1 className="gacha-title">BlindBox Frenzy GaCha</h1>

        <div className="balance-display">
          <p>Balance: ${balance}</p>
        </div>

        <div className={`gacha-capsule ${isLoading ? "gacha-loading fast-spin" : ""}`}>
          {isLoading ? <div className="gacha-loading-spinner"></div> : <img src="gacha4.png" alt="Gacha Icon" />}
        </div>

        <div className="gacha-buttons">
          <button onClick={() => openGacha(1)} disabled={isLoading || balance < 10} className="gacha-button">
            {isLoading ? "Opening..." : "Spin 1 Time"}
          </button>
          <button onClick={() => openGacha(5)} disabled={isLoading || balance < 50} className="gacha-button">
            {isLoading ? "Opening..." : "Spin 5 Times"}
          </button>
        </div>

        {/* Display results only after the spinning effect */}
        {items.length > 0 && (
          <div className="gacha-results">
            {items.map((item, index) => (
              <div key={index} className="gacha-result">
                <h3 className="gacha-item-name">Congratulations! You got: {item.name}</h3>
                <img src={item.imageUrl} alt={item.name} className="gacha-item-image" />
                <p className="gacha-item-rarity">Rarity: {item.rarity}</p>
              </div>
            ))}
          </div>
        )}

        {error && <p className="gacha-error">{error}</p>}

        {items.length > 0 && (
          <div className="gacha-actions">
            <button onClick={handleClickOk} className="gacha-action-button">Ok</button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default GachaBlindbox;
