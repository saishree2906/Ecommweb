import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if ((isSignup && !name.trim()) || !email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    try {
      let response;

      if (isSignup) {
        // Register user
        response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
      } else {
        // Login user
        response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      // Save token + user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);
      
      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/AdminDash"); // Admin page
      } else {
        navigate("/Products"); // Regular user page
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Server error, please try again later");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Create Account" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsSignup(!isSignup)}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default Login;
