import banner from "../assets/bannerimg.jpg";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    {/* Hero Banner Section */}
    <div className="hero">
      <img src={banner} alt="Shop Banner" className="hero-img" />
      <div className="hero-text">
        <h1>Welcome to Ecommerce</h1>
        
        <Link to="/products" className="shop-btn">
          Shop Now
        </Link>
      </div>
    </div>

    {/* Featured Section */}
    <div className="features">
      <h2>Why Shop With Us?</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <h3>Best Deals</h3>
          <p>Find top products at unbeatable prices every day.</p>
        </div>
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered right to your doorstep quickly.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>Shop with confidence with our secure payment system.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
