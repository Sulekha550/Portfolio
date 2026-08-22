import { useState } from "react";
import "./login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "portfolio123") {
      localStorage.setItem("portfolio_admin", "true");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <span>PORTFOLIO ADMIN</span>
        <h1>Welcome back.</h1>
        <p>Manage your projects and contact messages.</p>

        <input
          required
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Sign In</button>

        {error && <small>{error}</small>}

        <em>Demo login: admin / portfolio123</em>
      </form>
    </div>
  );
}
