import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data);

      alert("Login Successful");
      navigate("/search");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "18px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "55px" }}>🎵</div>

          <h1
            style={{
              margin: "10px 0",
              color: "#1e293b",
            }}
          >
            Music Catalog Insights
          </h1>

          <p
            style={{
              color: "#6b7280",
              margin: 0,
            }}
          >
            Sign in to continue
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#6b7280",
          }}
        >
          
        </p>
      </div>
    </div>
  );
}

export default Login;