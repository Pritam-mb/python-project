// convert.js
// This script converts hospitals.csv to hospitals.json

const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

// Path to your CSV file
const csvFilePath = path.join(__dirname, "src", "data", "hospitals.csv");

// Path to output JSON file
const jsonFilePath = path.join(__dirname, "src", "data", "hospitals.json");

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
    console.log(`✅ JSON file created at ${jsonFilePath}`);
  })
  .catch((err) => {
    console.error("❌ Error converting CSV to JSON:", err);
  });
