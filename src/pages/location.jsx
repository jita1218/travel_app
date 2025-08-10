// src/pages/Location.jsx
import React, { useState } from "react";
import axios from "axios";
import locations from "../data/locations"; // ✅ Import static locations list

function Location() {
  const [region, setRegion] = useState("");
  const [pois, setPois] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!region) return;
    setLoading(true);
    try {
      const poiRes = await axios.get(`/api/destination/popular?region=${region}`);
      const hotelRes = await axios.get(`/api/destination/hotels?region=${region}`);

      console.log("POIs Response:", poiRes.data);
      console.log("Hotels Response:", hotelRes.data);

      setPois(poiRes.data.pois || []);
      setHotels(hotelRes.data.hotels || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  // ✅ Helper to safely get an image from API object
  const getImage = (item) => {
    return (
      item.image ||
      item.photo ||
      item.image_url ||
      item.imgUrl ||
      "https://via.placeholder.com/300x200?text=No+Image"
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Explore Locations</h1>

      {/* Dropdown from static locations */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      >
        <option value="">Select a location</option>
        {locations.map((loc, index) => (
          <option key={index} value={loc.region}>
            {loc.name}
          </option>
        ))}
      </select>

      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {!loading && pois.length > 0 && (
        <div>
          <h2>Popular Places</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {pois.map((item, i) => (
              <div
                key={i}
                style={{
                  width: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={getImage(item)}
                  alt={item.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h3>{item.name}</h3>
                  <p>{item.description || "No description available."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && hotels.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Hotels</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {hotels.map((item, i) => (
              <div
                key={i}
                style={{
                  width: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={getImage(item)}
                  alt={item.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h3>{item.name}</h3>
                  <p>{item.description || "No description available."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
