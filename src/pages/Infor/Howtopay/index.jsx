import React, { useEffect } from "react";
import Container from "../../../component/Container";

const OrderGuidePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <div
        style={{
          width: "100%",
          padding: "50px 40px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#ffffff",
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          Payment Guide
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <strong>Step 1:</strong> Access the website and select the product you
          wish to purchase.
        </p>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <strong>Step 2:</strong> Click on the product you want to buy, and a
          pop-up will display with the following options:
        </p>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            If you want to continue shopping: Click on "Continue shopping" to
            add more products to your cart.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            If you want to view your cart and update the products: Click on
            "View cart."
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            If you want to place an order and pay for this product: Click on
            "Place order and pay."
          </li>
        </ul>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <strong>Step 3:</strong> Choose your account payment information:
        </p>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            If you already have an account, please enter your login information
            (email and password) in the "Already have an account" section.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            If you don't have an account and would like to register, please fill
            in your personal information to continue registering. With an
            account, you can easily track your orders.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            If you want to purchase without an account, please click on "Place
            order without account."
          </li>
        </ul>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <strong>Step 4:</strong> Fill in your details to receive the order,
          choose your payment and shipping methods for the order.
        </p>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <strong>Step 5:</strong> Review your order information, add any notes,
          and submit the order.
        </p>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          Once we receive your order, we will contact you by phone to confirm
          your order and address.
        </p>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <strong>Thank you!</strong>
        </p>
      </div>
    </Container>
  );
};

export default OrderGuidePage;
