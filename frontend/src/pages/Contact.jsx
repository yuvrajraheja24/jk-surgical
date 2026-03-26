import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Contact() {
  const navigate = useNavigate();

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

        <button
          className="whatsapp-btn large"
          onClick={() => {
            const phone = "917404262968";
            const message = `Hello JK Surgical 👋
I'm visiting your website and want more details.

📍 Location: Sirsa 
🛒 Interested in bulk order

Please guide me.`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
          }}
        >
          📲 Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}