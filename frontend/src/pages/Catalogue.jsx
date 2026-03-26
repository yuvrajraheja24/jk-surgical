import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/global.css";

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // ✅ FETCH
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ IMAGE FIX (cloud/local/placeholder)
  const getImage = (p) => {
    if (!p.image) return "https://via.placeholder.com/200";

    if (p.image.startsWith("http")) {
      return p.image; // Cloudinary
    }

    return `https://jk-surgical-backend.onrender.com/uploads/${p.image}`;
  };

  // ✅ FILTER
  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalog-container">
      {/* HEADER */}
      <div className="header">
        <button onClick={() => navigate("/")} className="back">
          ← Back
        </button>

        <h1>🛒 Product Catalogue</h1>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCTS */}
      {filtered.length === 0 ? (
        <p className="no-data">No products found</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <div className="card" key={p._id}>
              {/* Removed onClick={(e) => openPreview(e, p.image)} and replaced with onClick={() => setPreview(getImage(p))} */}
              <img
                src={getImage(p)}
                alt="product"
                className="card-img"
                onClick={() => setPreview(getImage(p))}
              />

              <h3 className="title">{p.name}</h3>
              <p className="brand">Brand: {p.brand || "N/A"}</p>
              <p className="price">₹{p.price}</p>
              <p className="desc">
                {p.description || "No description available"}
              </p>

              <button
                className="whatsapp"
                onClick={() =>
                  window.open(
                    `https://wa.me/917404262968?text=${encodeURIComponent(
                      `Hello, I'm interested in ${p.name}`
                    )}`
                  )
                }
              >
                Contact on WhatsApp
              </button>
            </div>
          ))}
        </div>
      )}

      {/* IMAGE MODAL */}
      {preview && (
        <div className="modal" onClick={() => setPreview(null)}>
          <img src={preview} alt="preview" />
        </div>
      )}
    </div>
  );
}