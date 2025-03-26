import React, { useEffect } from "react";
import Container from '../../../component/Container';
const TermsUse = () => {
  // Cuộn về đầu trang khi trang được tải
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
    <div
      style={{
        width: "100%",
        padding: "40px 20px",
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
        By accessing our website, you agree to these terms and conditions. We
        reserve the right to modify, change, add, or remove any part of these
        Terms and Conditions at any time. Any changes will take effect
        immediately upon being posted on the website, without prior notice. If
        you continue to use the website after such changes are posted, it means
        you accept those changes.
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
        Please check regularly to stay updated with our changes.
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
        1. Website Usage Guidelines
      </h2>
      <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          Users must be at least 18 years old to access our website or do so
          under the supervision of a parent or legal guardian.
        </li>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          We grant you a license to use the website for shopping within the
          framework of these terms and conditions.
        </li>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          It is strictly prohibited to use any part of this website for
          commercial purposes or on behalf of any third party without our
          written permission. If you violate any part of this agreement, we will
          revoke your license without notice.
        </li>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          This website is for providing product information only, and we are not
          the manufacturer. Therefore, the reviews displayed on the website are
          personal opinions of customers, not ours.
        </li>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          You must register an account with accurate information and update it
          if any changes occur. Each user is responsible for their password,
          account, and activities on the website. You must also inform us if
          your account is accessed without permission. We are not liable for any
          damages or losses, whether direct or indirect, caused by your failure
          to comply with the regulations.
        </li>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          Throughout the registration process, you agree to receive promotional
          emails from the website. If you no longer wish to receive these
          emails, you can unsubscribe by clicking the link at the bottom of any
          promotional email.
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
          We reserve the right to refuse or cancel your order for any reason at
          any time. We may ask for additional information, such as phone numbers
          or addresses, before accepting an order.
        </li>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          We strive to provide the most accurate pricing information. However,
          errors may occur, such as incorrect pricing or prices not displaying
          correctly. In such cases, we will contact you to guide you or notify
          you of the cancellation of the order. We also reserve the right to
          refuse or cancel any order, regardless of whether it has been
          confirmed or paid.
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
        3. Trademarks and Copyright
      </h2>
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
        All intellectual property rights (whether registered or not), content,
        information, and all designs, texts, graphics, software, images, videos,
        music, audio, software compilations, source code, and basic software are
        our property. All content on the website is protected by Vietnamese
        copyright law and international conventions. Copyright is reserved.
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
        4. Legal Jurisdiction
      </h2>
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
        The terms, conditions, and content of this website are governed by
        Vietnamese law, and any disputes arising from the unauthorized use of
        this website will be resolved by the competent courts in Vietnam.
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
        5. Privacy Policy
      </h2>
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
        Our website places great importance on protecting your information and
        employs the best measures to safeguard your details and payment
        processes. Your information during the payment process is encrypted for
        security. Once you complete your order, you will exit secure mode.
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
        6. Changes and Cancellation of Transactions
      </h2>
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
        In all cases, customers have the right to cancel transactions if they
        take the following actions:
      </p>
      <ul style={{ marginLeft: "40px", paddingLeft: "10px" }}>
        <li
          style={{
            fontSize: "1.1rem",
            marginBottom: "10px",
            listStyleType: "disc",
          }}
        >
          Return goods that have been received but not used or benefited from in
          accordance with the return policy.
        </li>
      </ul>
    </div>
    </Container>
  );
};

export default TermsUse;
