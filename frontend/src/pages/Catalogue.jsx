import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/global.css";

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleWhatsApp = (p) => {
    const phone = "917404262968";
    const msg = `Hello, I'm interested in ${p.name} (${p.brand})`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  };

  // 🔍 FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    return (
      (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="catalog-page">
      {/* HEADER */}
      <div className="catalog-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h1>🛒 Product Catalogue</h1>

        {/* 🔍 SEARCH INSIDE HEADER */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search products or brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <p className="no-data">No products found</p>
      ) : (
        filteredProducts.map((p) => (
          <div className="product-card" key={p._id}>
            {/* IMAGE */}
            <div className="product-img">
              {p.image ? (
                <img src={`http://localhost:8000/uploads/${p.image}`} />
              ) : (
                <div className="no-img">No Image</div>
              )}
            </div>

            {/* DETAILS */}
            <div className="product-info">
              <h3>{p.name}</h3>

              <p className="brand">{p.brand}</p>

              {/* 💰 PRICE ADD */}
              <p className="price">₹{p.price}</p>

              <span className="badge">Available</span>

              <p className="desc">
                ✔ Genuine surgical products <br />
                ✔ Trusted quality <br />
                ✔ Bulk orders available
              </p>

              <button
                className="whatsapp-btn"
                onClick={() => handleWhatsApp(p)}
              >
                📲 Contact on WhatsApp
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}