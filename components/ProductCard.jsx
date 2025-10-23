// components/ProductCard.jsx
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null; // ✅ Safe check

  // Use default values if some fields are missing
  const {
    name = "Unnamed Product",
    price = 0,
    discount = 0,
    img = "https://via.placeholder.com/150",
    description = "No description available",
    rating = 0,
    id,
  } = product;

  const discountedPrice =
    price && discount ? price - (price * discount) / 100 : price;

  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <img
        src={img}
        alt={name}
        style={{ width: "120px", height: "120px", objectFit: "contain" }}
      />
      <h3>{name}</h3>

      {/* ✅ Price handling */}
      <p>
        <strong>Price:</strong> ₹{price ? price.toLocaleString() : "N/A"}
      </p>

      {discount > 0 && (
        <p style={{ color: "green" }}>
          Discount: {discount}% (₹{discountedPrice.toLocaleString()})
        </p>
      )}

      <p>{description}</p>

      {/* ✅ Rating handling */}
      <p>⭐ {rating || 0}/5</p>

      {/* ✅ Add to Cart Button */}
      <button
        onClick={() =>
          addToCart({
            id,
            name,
            price: discountedPrice,
            img,
          })
        }
        style={{
          padding: "8px 12px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
