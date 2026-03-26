import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./dashboard.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [my, setMy] = useState({});
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const res = await API.get(`api/products?search=${search}`);
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
      if (key !== "_id") formData.append(key, my[key]);
    });

    if (file) formData.append("image", file);

    if (my._id) {
      await API.put(`api/products/${my._id}`, formData);
    } else {
      await API.post("api/products", formData);
    }

    setMy({});
    setFile(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setMy(p);
    setFile(null);
  };

  const deleteProduct = async (id) => {
    await API.delete(`api/products/${id}`);
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="dashboard-box">

        <h1>🛒 Product Manager</h1>

        <button className="btn-gray" onClick={handleLogout}>
          Logout
        </button>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="Search by name or brand..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} value={my.name || ""} />
          <input name="brand" placeholder="Brand" onChange={handleChange} value={my.brand || ""} />
          <input name="description" placeholder="Description" onChange={handleChange} value={my.description || ""} />
          <input name="price" placeholder="Price" onChange={handleChange} value={my.price || ""} />

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

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

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th> {/* 👈 NEW */}
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr key={p._id}>
                  {/* 👇 COUNTING COLUMN */}
                  <td>{index + 1}</td>
                  <td>
                    {p.image ? (
                      <img src={`http://localhost:8000/uploads/${p.image}`} alt="" />
                    ) : "No Image"}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.description}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button className="delete" onClick={() => deleteProduct(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}