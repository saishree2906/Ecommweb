import React, { useState, useEffect } from "react";

const PRODUCT_API = "http://localhost:5000/api/products/";
const CATEGORY_API = "http://localhost:5000/api/categories/";

const ManageProducts = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch all categories (GET)
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      setMessage("⚠️ Unable to load categories.");
    }
  };

  // ✅ Add a new category (POST)
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setMessage("⚠️ Category name cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(CATEGORY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error(await res.text());
      setMessage("✅ Category added successfully!");
      setNewCategory("");
      fetchCategories(); // refresh dropdown
    } catch (err) {
      setMessage(`❌ Error adding category: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Image drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
        setProduct((p) => ({ ...p, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProduct = (isUpdate = false) => {
    if (isUpdate && !product.id) {
      setMessage("⚠️ Product ID required for update.");
      return false;
    }
    if (!product.name || !product.price || !product.stock || !product.category) {
      setMessage("⚠️ Please fill all required fields including category.");
      return false;
    }
    return true;
  };

  const getToken = () => localStorage.getItem("token");

  // ✅ Add new product
  const handleAddProduct = async () => {
    if (!validateProduct()) return;
    try {
      const token = getToken();
      const res = await fetch(PRODUCT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: Number(product.price),
          stock: Number(product.stock),
          image: product.image,
          category: product.category,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      setMessage("✅ Product added successfully!");
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
      });
      setPreview("");
    } catch (err) {
      setMessage(`❌ Error adding product: ${err.message}`);
    }
  };

  // ✅ Update existing product
  const handleUpdateProduct = async () => {
    if (!validateProduct(true)) return;
    try {
      const token = getToken();
      const res = await fetch(`${PRODUCT_API}${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: Number(product.price),
          stock: Number(product.stock),
          image: product.image,
          category: product.category,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      setMessage("✅ Product updated successfully!");
    } catch (err) {
      setMessage(`❌ Error updating product: ${err.message}`);
    }
  };

  return (
    <div className="manage-products-page">
      <div className="manage-products-card">
        <h2 className="title">🛍 Manage Products</h2>
        <p className="subtitle">Add or update products and categories.</p>

        {/* Category Section */}
        <div className="category-section">
          <h3>📂 Add Category</h3>
          <div className="category-input">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
        </div>

        {/* Product Form */}
        <div className="manage-products-form">
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            placeholder="Product ID (only for update)"
          />

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
          />

          {/* ✅ Category Dropdown */}
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="category-dropdown"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>

          {/* Image upload */}
          <div
            className={`image-drop-zone ${dragActive ? "active" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <p>Drag & drop image or paste image URL 👇</p>
            )}
          </div>

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={(e) => {
              handleChange(e);
              setPreview(e.target.value);
            }}
            placeholder="Image URL (/images/example.jpg)"
          />

          <div className="form-buttons">
            <button className="btn-add" onClick={handleAddProduct}>
              ➕ Add Product
            </button>
            <button className="btn-update" onClick={handleUpdateProduct}>
              🔄 Update Product
            </button>
          </div>
        </div>

        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
};

export default ManageProducts;
