import { useEffect, useState } from "react";
import api from "../services/api";

function AI() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const response = await api.get("/ai/summary");
      setSummary(response.data.summary);
    } catch (error) {
      console.log(error);
      alert("Failed to load AI Summary");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          🎵 AI Music Summary
        </h1>

        <p
          style={{
            color: "#666",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Personalized insights generated from your music library.
        </p>

        <hr style={{ marginBottom: "25px", borderColor: "#eee" }} />

        <div
          style={{
            background: "#f8fafc",
            borderLeft: "5px solid #2563eb",
            padding: "20px",
            borderRadius: "10px",
            fontSize: "17px",
            lineHeight: "1.8",
            color: "#333",
          }}
        >
          {summary ? (
            summary
          ) : (
            <p style={{ color: "#888" }}>Generating AI summary...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AI;