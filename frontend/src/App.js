import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./dashboard.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [my, setMy] = useState({});
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const res = await API.get(`/api/products?search=${search}`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const handleChange = (e) => {
    setMy({ ...my, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(my).forEach((key) => {
      if (key !== "_id") {
        formData.append(key, my[key]);
      }
    });

    if (file) formData.append("image", file);

    try {
      if (my._id) {
        // ✅ UPDATE
        await API.put(`/api/products/${my._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // ✅ CREATE
        await API.post("/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMy({});
      setFile(null);
      fetchProducts();
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const deleteProduct = async (id) => {
    await API.delete(`/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setMy(p);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="dashboard-box">

        <div className="top-bar">

          <div className="title">
            🛒 Product Manager
          </div>

          <div className="top-actions">
            <input
              className="search"
              placeholder="🔍 Search products..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

        </div>

        {/* ✅ FORM (STACKED MOBILE STYLE) */}
        <form className="form-mobile" onSubmit={handleSubmit}>

          <input name="name" placeholder="Product Name" onChange={handleChange} value={my.name || ""} />

          <input name="brand" placeholder="Brand" onChange={handleChange} value={my.brand || ""} />

          <input name="description" placeholder="Description" onChange={handleChange} value={my.description || ""} />

          <input name="price" placeholder="Price ₹" onChange={handleChange} value={my.price || ""} />

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          {/* ✅ EDIT MODE BUTTONS */}
          {my._id ? (
            <div className="edit-actions">
              <button type="submit" className="save">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  setMy({});
                  setFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button type="submit">Add Product</button>
          )}

        </form>

        {/* ✅ PRODUCTS (CARD UI) */}
        <div className="products">

          {products.map((p, index) => (
            <div className="card" key={p._id}>

              <div className="card-row">

                {/* IMAGE */}
                <div className="card-img">
                  {p.image ? (
                    <img
                      src={`https://jk-surgical-backend.onrender.com/uploads/${p.image}`}
                      alt="product"
                    />
                  ) : (
                    "No Image"
                  )}
                </div>

                {/* DETAILS */}
                <div className="card-content">
                  <h3>{index + 1}. {p.name}</h3>
                  <p className="brand">{p.brand}</p>
                  <p className="price">₹{p.price}</p>
                </div>

              </div>

              <p className="desc">{p.description}</p>

              {/* BUTTONS */}
              <div className="card-btns">
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete" onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}