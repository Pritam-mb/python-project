import React, { useState,useEffect } from "react";
// import hospitals from "../data/hospitals.json"; // pre-converted JSON
import hospitals from "../data/datafile.json";

function HospitalCard({ hospital }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4">
      <h2 className="text-xl font-bold mb-2">{hospital.Hospital_Name}</h2>
      <p>{hospital.Address_Original_First_Line}</p>
      <p>District: {hospital.District}</p>
      <p>Emergency: {hospital.Emergency_Num || "N/A"}</p>
    </div>
  );
}

export default function Emergency() {
  const [city, setCity] = useState("");
  const [hospitalData, setHospitalData] = useState([]);
 
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null, error: null });

  // Get user's live location
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation((prev) => ({ ...prev, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setUserLocation((prev) => ({ ...prev, error: error.message }));
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const search = () => {
    let filter = hospitals;
    if(city.trim() != ""){
    const filterData = hospitals.filter(
      (hospital) =>
        hospital.District &&
        hospital.District.trim().toLowerCase() === city.toLowerCase()
    );
    setHospitalData(filterData);
  };
  if(userLocation.lat && userLocation.lon){
    const newdata = hospitals.map(hospital =>{
      const hlat = parseFloat(hospital.googlemapcorridinate_lati);
      const hlon = parseFloat(hospital.googlemapcorridinate_longi);
      if(!hlat || !hlon){
        return {
          ...hospital, distance: null
        };}
        const distance =getdistance(hlat,hlon,userLocation.lat,userLocation.lon);
        return {
          ...hospital, distance
        };
      });
    newdata.sort((a,b) => {
      if(a.distance === null) return 1;
      if(b.distance === null) return -1;
      return a.distance - b.distance;
    });
   filter= newdata.filter(hospital => hospital.distance !== null && hospital.distance <= 30);
      // const [lat, lon] = hospital.Lat_Lon ? hospital.Lat_Lon.split(",").map(Number) : [null, null];
  }
   setHospitalData(filter);
}

  return (
    <div className="p-4">
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded w-full"
        />
        {/* <input type="text"
        value={} /> */}
        <button
          onClick={search}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div>
        {hospitalData.length > 0 ? (
          hospitalData.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} />
          ))
        ) : (
          <p>No hospitals found.</p>
        )}
      </div>
    </div>
  );
}
function getdistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
