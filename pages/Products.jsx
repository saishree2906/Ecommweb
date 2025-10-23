import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // ✅ Function to fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Fetch products initially
  useEffect(() => {
    fetchProducts();

    // ✅ Listen for admin updates via localStorage
    const handleStorageChange = (event) => {
      if (event.key === "refreshProducts") {
        fetchProducts();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleAddToCart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    // If not logged in, redirect to login page
    alert("Please log in to add products to your cart.");
    window.location.href = "/login"; // or use navigate("/login") if you imported useNavigate
    return;
  }

  if (!selectedProduct) return;
  addToCart({ ...selectedProduct, quantity });
  setShowModal(false);
  alert(`Added ${quantity} × ${selectedProduct.name} to cart!`);
};

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "#1658a3" }}>Our Products</h2>

      {/* 🟢 Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product)}
            style={{ cursor: "pointer" }}
          >
            <ProductCard
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                img: product.image,
                description: product.description,
              }}
            />
          </div>
        ))}
      </div>

      {/* 🟢 Product Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: "200px", marginBottom: "15px", objectFit: "cover" }}
              />
              <h4 style={{ color: "#1658a3" }}>${selectedProduct.price}</h4>
              <Form.Group style={{ maxWidth: "120px", margin: "0 auto" }}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={selectedProduct.stock || 10}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(Math.max(1, Number(e.target.value)), selectedProduct.stock || 10)
                    )
                  }
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Products;
