import { useState } from "react";
import api from "../services/api";

function Search() {
  const [term, setTerm] = useState("");
  const [albums, setAlbums] = useState([]);

  const searchAlbums = async () => {
    try {
      const response = await api.get(`/albums/search?term=${term}`);

      const albumsWithRating = response.data.map((album) => ({
        ...album,
        rating: 4,
      }));

      setAlbums(albumsWithRating);
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    }
  };

  const saveAlbum = async (album) => {
    try {
      await api.post("/albums/save", {
        appleCatalogId: album.appleCatalogId,
        albumName: album.albumName,
        artistName: album.artistName,
        genre: album.genre,
        releaseDate: album.releaseDate,
        trackCount: album.trackCount,
        artworkUrl: album.artworkUrl,
        price: album.price,
        rating: album.rating,
        notes: "",
      });

      alert("Album Saved");
    } catch (error) {
      console.log(error);
      alert("Save Failed");
    }
  };

  const updateRating = (albumId, rating) => {
    setAlbums(
      albums.map((album) =>
        album.appleCatalogId === albumId
          ? { ...album, rating }
          : album
      )
    );
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
          marginBottom: "30px",
        }}
      >
        🎵 Search Albums
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <input
          placeholder="Search by album or artist..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            width: "350px",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          onClick={searchAlbums}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔍 Search
        </button>
      </div>

      {albums.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "18px",
          }}
        >
          Search for albums to get started.
        </p>
      ) : (
        albums.map((album) => (
          <div
            key={album.appleCatalogId}
            style={{
              maxWidth: "850px",
              margin: "0 auto 25px",
              background: "#fff",
              borderRadius: "15px",
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
              <h2 style={{ marginBottom: "10px" }}>
                {album.albumName}
              </h2>

              <p>
                <strong>🎤 Artist:</strong> {album.artistName}
              </p>

              <p>
                <strong>🎼 Genre:</strong> {album.genre}
              </p>

              <p>
                <strong>💰 Price:</strong> ${album.price}
              </p>

<p>
                <strong>Give your rating :</strong>
              </p>              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "15px",
                  marginBottom: "20px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      updateRating(album.appleCatalogId, star)
                    }
                    title={`${star} Star${star > 1 ? "s" : ""}`}
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      color:
                        star <= album.rating
                          ? "#fbbf24"
                          : "#d1d5db",
                      transition: "0.2s",
                      userSelect: "none",
                    }}
                  >
                    ★
                  </span>
                ))}

                <span
                  style={{
                    marginLeft: "8px",
                    color: "#6b7280",
                    fontWeight: "600",
                  }}
                >
                  {album.rating}/5
                </span>
              </div>

              <button
                onClick={() => saveAlbum(album)}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                💾 Save Album
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Search;