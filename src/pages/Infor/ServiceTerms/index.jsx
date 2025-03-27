import React, { useEffect } from "react";
import Container from "../../../component/Container";

const PoliciesPage = () => {
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
          Terms and Conditions
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
          By accessing our website, you agree to these terms and conditions. The
          website reserves the right to modify, amend, add or remove any part of
          these Terms and Conditions at any time. Any changes will take effect
          immediately upon being posted on the website without prior notice. By
          continuing to use the website after changes to the terms and
          conditions are posted, you accept those changes.
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
          Please check regularly for any updates to these terms.
        </p>

        <h2
          style={{
            fontSize: "1.4rem",
            marginTop: "30px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          1. Website Usage Instructions
        </h2>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            Users must be at least 18 years old or access the website under the
            supervision of parents or legal guardians.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            We grant you a license to shop on the website in accordance with the
            terms and conditions outlined here.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            The use of any part of this website for commercial purposes or on
            behalf of any third party without our written permission is strictly
            prohibited. Any violation of these terms may result in the immediate
            cancellation of your license without prior notice.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            This website is only for providing product information; we are not
            the manufacturers. Any comments displayed on the website are the
            personal opinions of customers, not ours.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            You must register an account with accurate personal information and
            update it if there are any changes. Each user is responsible for
            their account, password, and activities on the website.
            Additionally, you must notify us immediately if your account is
            accessed without authorization. We are not responsible for any
            damages resulting from your failure to comply with these rules.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            During registration, you agree to receive promotional emails from
            the website. You can unsubscribe at any time by clicking the link at
            the bottom of any promotional email.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.4rem",
            marginTop: "30px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          2. Order Acceptance and Pricing
        </h2>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            We have the right to refuse or cancel your order for any reason at
            any time. We may ask for additional information such as phone number
            and address before processing your order.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            We commit to providing the most accurate pricing information to
            consumers. However, occasional errors may occur, such as when the
            price displayed on the website is incorrect. In such cases, we will
            contact you to guide you or notify you that the order will be
            canceled. We also reserve the right to refuse or cancel any order,
            whether it has been confirmed or not.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.4rem",
            marginTop: "30px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          3. Trademarks and Copyrights
        </h2>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            All intellectual property rights (registered or unregistered), the
            content information, and all designs, texts, graphics, software,
            images, videos, music, sounds, software compilations, source code,
            and underlying software are our property. All content on this
            website is protected by Vietnam's copyright law and international
            conventions. Copyrights are reserved.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.4rem",
            marginTop: "30px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          4. Legal Jurisdiction
        </h2>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            The terms, conditions, and content of this website are governed by
            the laws of Vietnam. The competent courts in Vietnam shall resolve
            any disputes arising from the unauthorized use of this website.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.4rem",
            marginTop: "30px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          5. Privacy Policy
        </h2>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            Our website values information security and uses the best practices
            to protect your information and transactions. Your payment
            information will be encrypted to ensure security.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            You are prohibited from using any programs, tools, or methods to
            interfere with or alter the system or modify the data structure. Any
            activity that interferes with, damages, or breaches the system’s
            data is strictly prohibited and may lead to legal action.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            All transaction information will be kept confidential, but if
            required by law enforcement, we are obligated to provide this
            information to the authorities.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.4rem",
            marginTop: "30px",
            color: "#444",
            textAlign: "left",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          6. Order Modification and Cancellation
        </h2>

        <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            In any case, the customer has the right to cancel the transaction if
            the following actions have been taken:
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              listStyleType: "disc",
            }}
          >
            Return the goods that have been received but not used or benefited
            from the goods (according to the return policy).
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default PoliciesPage;
