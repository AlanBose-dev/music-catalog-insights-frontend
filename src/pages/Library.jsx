import { useEffect, useState } from "react";
import api from "../services/api";

function Library() {
  const [albums, setAlbums] = useState([]);

  const loadAlbums = async () => {
    try {
      const response = await api.get("/albums");
      setAlbums(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load albums");
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const deleteAlbum = async (id) => {
    try {
      await api.delete(`/albums/${id}`);
      alert("Album Deleted");
      loadAlbums();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "35px",
        }}
      >
        📚 My Music Library
      </h1>

      {albums.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "18px",
            marginTop: "60px",
          }}
        >
          <h2>No albums saved yet.</h2>
          <p>Search and save your favorite albums to see them here.</p>
        </div>
      ) : (
        albums.map((album) => (
          <div
            key={album.id}
            style={{
              maxWidth: "850px",
              margin: "0 auto 25px",
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={album.artworkUrl}
              alt={album.albumName}
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: "0 0 12px",
                  color: "#222",
                }}
              >
                {album.albumName}
              </h2>

              <p>
                <strong>🎤 Artist:</strong> {album.artistName}
              </p>

              <p>
                <strong>🎼 Genre:</strong> {album.genre}
              </p>

              <p>
                <strong>⭐ Rating:</strong> {album.rating}/5
              </p>

              <p>
                <strong>📝 Notes:</strong>{" "}
                {album.notes || "No notes available"}
              </p>

              <button
                onClick={() => deleteAlbum(album.id)}
                style={{
                  marginTop: "12px",
                  padding: "10px 22px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🗑 Delete Album
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Library;