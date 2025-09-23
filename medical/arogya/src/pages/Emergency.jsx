import React, { useState, useEffect } from "react";
import hospitals from "../data/datafile2.json";

// Hospital Card Component
function HospitalCard({ hospital }) {
  const getCategoryEmoji = (category) => {
    if (!category) return "🏥";

    const categoryMap = {
      public: "🏛️",
      private: "💼",
      government: "🏛️",
      cardiology: "❤️",
      surgery: "🔪",
      emergency: "🚨",
      pediatric: "👶",
      orthopedics: "🦴",
      dermatology: "🔬",
      dentistry: "🦷",
      psychiatry: "🧠",
      oncology: "🎗️",
      neurology: "🧠",
      radiology: "📷",
      gynaecology: "🌸",
      urology: "💧",
      ophthalmology: "👁️",
    };

    const lower = category.toLowerCase();
    for (const key in categoryMap) {
      if (lower.includes(key)) return categoryMap[key];
    }
    return "🏥";
  };

  const getSpecialtyEmojis = (specialties) => {
    if (!specialties) return "";
    const specialtyMap = {
      anaesthesiology: "💉",
      cardiac: "❤️",
      cardiology: "❤️",
      surgery: "🔪",
      "critical care": "🚑",
      dentistry: "🦷",
      dermatology: "🔬",
      emergency: "🚨",
      endocrinology: "🦋",
      ent: "👂",
      gastroenterology: "🍃",
      "general medicine": "💊",
      gynaecology: "🌸",
      haematology: "🩸",
      nephrology: "🧠",
      neuro: "🧠",
      obstetrics: "👶",
      oncology: "🎗️",
      orthopedics: "🦴",
      pediatric: "👶",
      physiotherapy: "💪",
      psychiatry: "🧠",
      pulmonology: "🫁",
      radiology: "📷",
      rheumatology: "🦵",
      spine: "🦴",
      urology: "💧",
      vascular: "🩸",
    };

    const lower = specialties.toLowerCase();
    const emojis = [];
    for (const key in specialtyMap) {
      if (lower.includes(key) && !emojis.includes(specialtyMap[key])) {
        emojis.push(specialtyMap[key]);
      }
    }
    return emojis.slice(0, 3).join(" ");
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out w-full md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] min-w-[300px] flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-xl font-bold flex-1">{hospital.hospitalname}</h2>
        <span className="text-2xl ml-2">
          {getCategoryEmoji(hospital["Hospital Category"])}
        </span>
      </div>

      <div className="text-left space-y-1 flex-1">
        <p className="flex items-center">
          <span className="mr-2">📍</span>
          {hospital["address First Line"]}
        </p>
        <p className="flex items-center">
          <span className="mr-2">🏙️</span>
          District: {hospital.district}
        </p>
        <p className="flex items-center">
          <span className="mr-2">🗺️</span>
          State: {hospital.state}
        </p>
        <p className="flex items-center">
          <span className="mr-2">📞</span>
          {hospital.telephone || hospital.mobilenumber || hospital.emergencynum || "N/A"}
        </p>
        {hospital["Hospital Category"] && (
          <p className="flex items-center">
            <span className="mr-2">🏷️</span>
            Category: {hospital["Hospital Category"]}
          </p>
        )}
        {hospital.specialties && (
          <p className="flex items-center flex-wrap">
            <span className="mr-2">⭐</span>
            <span>{getSpecialtyEmojis(hospital.specialties)}</span>
            <span className="text-sm text-gray-600 ml-1 truncate">{hospital.specialties}</span>
          </p>
        )}
        {hospital.distance !== undefined && hospital.distance !== null && (
          <p className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📏</span>
            Distance: {hospital.distance.toFixed(2)} km
          </p>
        )}
        {hospital.website && hospital.website !== "NA" && (
          <p className="flex items-center text-sm text-blue-600">
            <span className="mr-2">🌐</span>
            <a href={`https://${hospital.website}`} target="_blank" rel="noopener noreferrer">
              {hospital.website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function Emergency() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospitalData, setHospitalData] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null, error: null });

  // Category & Specialty options
  const categoryOptions = [...new Set(hospitals.map(h => h["Hospital Category"]).filter(Boolean))];
  const specialtyOptions = [
    "Anaesthesiology", "Cardiology", "Surgery", "Paediatric", "Orthopedics", "Dermatology",
    "Dentistry", "Psychiatry", "Oncology", "Neurology", "Radiology", "Gynaecology", "Urology"
  ];

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(prev => ({ ...prev, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude, error: null }),
      err => setUserLocation(prev => ({ ...prev, error: err.message })),
      { enableHighAccuracy: true }
    );
  }, []);

  // Search function
  const search = () => {
    let filtered = [...hospitals];

    // City/District/State filter
    if (city.trim()) {
      filtered = filtered.filter(h => 
        (h.district && h.district.toLowerCase().includes(city.toLowerCase())) ||
        (h.state && h.state.toLowerCase().includes(city.toLowerCase())) ||
        (h.subdristrict && h.subdristrict.toLowerCase().includes(city.toLowerCase()))
      );
    }

    // Category filter
    if (category.trim()) {
      filtered = filtered.filter(h => 
        h["Hospital Category"]?.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Specialty filter
    if (specialty.trim()) {
      filtered = filtered.filter(h =>
        h.specialties?.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Distance calculation if location available
    if (userLocation.lat && userLocation.lon) {
      filtered = filtered.map(h => {
        const lat = parseFloat(h.googlemapcorridinate_lati);
        const lon = parseFloat(h.googlemapcorridinate_longi);
        if (isNaN(lat) || isNaN(lon)) return { ...h, distance: null };
        return { ...h, distance: getDistance(lat, lon, userLocation.lat, userLocation.lon) };
      });
      // Sort by distance
      filtered = filtered.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    setHospitalData(filtered);
  };

  // Trigger search on component mount and when location is obtained
  useEffect(() => { search(); }, [userLocation.lat, userLocation.lon]);

  // Distance calculation helper
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City/District/State" className="border p-2 rounded w-full" onKeyPress={e => e.key === "Enter" && search()} />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded w-full md:w-48">
          <option value="">All Categories</option>
          {categoryOptions.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
        </select>
        <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="border p-2 rounded w-full md:w-64">
          <option value="">All Specialties</option>
          {specialtyOptions.map((spec, i) => <option key={i} value={spec}>{spec}</option>)}
        </select>
        <button onClick={search} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
          Search 🔍
        </button>
      </div>

      {userLocation.error && <p className="text-red-500 mb-2">{userLocation.error}</p>}

      <div className="flex flex-wrap gap-4 justify-center">
        {hospitalData.length ? hospitalData.map((h, i) => <HospitalCard key={i} hospital={h} />) 
        : <p>No hospitals found.</p>}
      </div>
    </div>
  );
}
