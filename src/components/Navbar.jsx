import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "#1e293b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 40px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#38bdf8",
          fontWeight: "bold",
        }}
      >
        🎵 Music Catalog Insights
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/search"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          🔍 Search
        </Link>

        <Link
          to="/library"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          📚 Library
        </Link>

        <Link
          to="/analytics"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          📊 Analytics
        </Link>

        <Link
          to="/ai"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          🤖 AI Summary
        </Link>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;