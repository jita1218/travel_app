import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

// Sample fallback images (replace with your own good-looking photos)
const fallbackImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Beach
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Mountain
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", // City
  "https://images.unsplash.com/photo-1519821172141-b5d8e87a1284", // Lake
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1", // Desert
];

const Location = () => {
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pois, setPois] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activeTab, setActiveTab] = useState("pois");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Hook for navigation
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async () => {
    if (!region.trim()) {
      setError("Please enter a location name");
      return;
    }
    setError("");
    setLoading(true);
    setPois([]);
    setHotels([]);

    try {
      const poiRes = await axios.get(`${API_BASE}/api/destination/popular?region=${region}`);
      const hotelRes = await axios.get(`${API_BASE}/api/destination/hotels?region=${region}`);

      setPois(poiRes.data.pois || []);
      setHotels(hotelRes.data.hotels || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getImage = (item, index) => {
    return (
      item.image ||
      item.photo ||
      item.image_url ||
      item.imgUrl ||
      fallbackImages[index % fallbackImages.length]
    );
  };

  // ✅ Navigate to booking form with destination
  // ✅ Navigate to register-package with destination
const handleImageClick = (name) => {
  navigate(`/register-package?package=${encodeURIComponent(name)}`);
};


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Search Destinations</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Type any location..."
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === "pois" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("pois")}
        >
          Popular Destinations
        </button>
        <button
          style={activeTab === "hotels" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("hotels")}
        >
          Hotels
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Cards */}
      <div style={styles.cardContainer}>
        {activeTab === "pois" &&
          pois.map((item, i) => (
            <div key={i} style={styles.card}>
              <img
                src={getImage(item, i)}
                alt={item.name}
                style={{ ...styles.image, cursor: "pointer" }}
                onClick={() => handleImageClick(item.name)} // ✅ Click to navigate
              />
              <h3>{item.name}</h3>
              <p>{item.description || ""}</p>
            </div>
          ))}

        {activeTab === "hotels" &&
          hotels.map((item, i) => (
            <div key={i} style={styles.card}>
              <img
                src={getImage(item, i)}
                alt={item.name}
                style={{ ...styles.image, cursor: "pointer" }}
                onClick={() => handleImageClick(item.name)} // ✅ Click to navigate
              />
              <h3>{item.name}</h3>
              <p>{item.description || ""}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: "20px" },
  searchBox: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", width: "250px" },
  button: { padding: "10px 15px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red", textAlign: "center" },
  tabs: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  tab: { padding: "10px 20px", border: "1px solid #ccc", backgroundColor: "#f0f0f0", cursor: "pointer" },
  activeTab: { padding: "10px 20px", border: "1px solid #ccc", backgroundColor: "#007bff", color: "#fff" },
  cardContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "10px", borderRadius: "8px", backgroundColor: "#fff" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" },
};

export default Location;
