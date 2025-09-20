import React, { useState } from "react";

// Reusable Card Component
function HospitalCard({ hospital }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "15px",
        backgroundColor: "#f5f8ff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2 style={{ color: "#1e40af", marginBottom: "5px" }}>{hospital.name}</h2>
      <p><strong>City:</strong> {hospital.city}</p>
      <p><strong>Latitude:</strong> {hospital.lat}</p>
      <p><strong>Longitude:</strong> {hospital.lon}</p>
    </div>
  );
}

function Emergency() {
  const [city, setCity] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const hospitals = [
    { id: 1, name: "City Hospital", city: "howrah", lat: 22.5726, lon: 88.3639 },
    { id: 2, name: "Green Valley Clinic", city: "kolkata", lat: 22.58, lon: 88.37 },
    { id: 3, name: "Health Plus Hospital", city: "hoogly", lat: 22.6, lon: 88.4 },
  ];

  const handleSubmit = () => {
    const results = hospitals.filter(
      (hospital) => hospital.city.toLowerCase() === city.toLowerCase()
    );
    setFilteredHospitals(results);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#e0e7ff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#1e3a8a", marginBottom: "25px" }}>🚑 Emergency Hospital Finder</h1>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #94a3b8",
            marginRight: "10px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 25px",
            borderRadius: "8px",
            backgroundColor: "#1e40af",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </div>

      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))
        ) : (
          <p style={{ color: "#334155" }}>
            No hospitals found. Try entering "howrah", "kolkata", or "hoogly".
          </p>
        )}
      </div>
    </div>
  );
}

export default Emergency;
