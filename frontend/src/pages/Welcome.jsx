import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">

      <div className="hero-center">

        {/* LOGO / TITLE */}
        <h1 className="title">🏥 JK Surgical</h1>

        {/* TAGLINE */}
        <p className="subtitle">
          Trusted Surgical Products for Hospitals & Clinics
        </p>

        {/* EXTRA INFO */}
        <p className="subtext">
          Wholesale Supplier • Bulk Orders • Best Market Prices • Fast Delivery
        </p>

        {/* FEATURES */}
        <div className="features-row">
          <span>✔ Genuine Products</span>
          <span>✔ Trusted by Clinics</span>
          <span>✔ Best Wholesale Rates</span>
        </div>

        {/* BUTTONS */}
        <div className="btn-group">

          <button
            onClick={() => navigate("/catalog")}
            className="btn primary"
          >
            🛒 View Catalogue
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="btn secondary"
          >
            📞 Contact Us
          </button>

          <button
            onClick={() => navigate("/login")}
            className="btn admin"
          >
            🔐 Admin Login
          </button>

        </div>

      </div>
    </div>
  );
}