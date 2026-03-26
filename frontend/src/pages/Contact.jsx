import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Contact() {
  const navigate = useNavigate();

  // ✅ WhatsApp (NEW NUMBER)
  const handleWhatsApp = () => {
    const phone = "917404262968"; // ✅ 7404262968
    const message = `Hello JK Surgical 👋
I'm visiting your website and want more details.

📍 Location: Sirsa 
🛒 Interested in products

Please guide me.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  // ✅ CALL BUTTON
  const handleCall = () => {
    window.location.href = "tel:9813175648"; // ✅ Call number
  };

  return (
    <div className="contact-page">

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="contact-title">📍 JK Surgical</h1>

      <p className="tagline">
        Serving healthcare with trust for over <strong>21+ years</strong>
      </p>

      <div className="contact-box big">

        <h2>🏥 Our Store</h2>

        <p><strong>Shop Name:</strong> JK Surgical</p>
        <p><strong>Location:</strong> Bishnoi Market, Sirsa Haryana</p>
        <p><strong>Shop No.:</strong> 18</p>

        <hr />

        <h3>💊 Why Choose Us?</h3>
        <ul>
          <li>✔ 21+ Years of Trusted Experience</li>
          <li>✔ Genuine Surgical & Medical Products</li>
          <li>✔ Trusted by Doctors & Clinics</li>
          <li>✔ Best Quality at Competitive Prices</li>
          <li>✔ Bulk Orders Available</li>
        </ul>

        {/* ✅ WHATSAPP */}
        <button className="whatsapp-btn large" onClick={handleWhatsApp}>
          📲 Chat on WhatsApp
        </button>

        {/* ✅ CALL NOW */}
        <button className="call-btn large" onClick={handleCall}>
          📞 Call Now
        </button>

      </div>
    </div>
  );
}