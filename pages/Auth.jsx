import { useState } from "react";

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (type) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error occurred");
        return;
      }

      // ✅ Store userId in localStorage
      localStorage.setItem("userId", data.userId);
      alert(`${type === "login" ? "Login" : "Signup"} successful!`);
      onLogin(); // notify parent to refresh state
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login / Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="auth-buttons">
        <button onClick={() => handleAuth("login")}>Login</button>
        <button onClick={() => handleAuth("signup")}>Signup</button>
      </div>
    </div>
  );
};

export default Auth;
