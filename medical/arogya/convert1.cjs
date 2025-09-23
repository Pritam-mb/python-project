// convert.cjs
const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = './src/data/datafile.csv'; // path to your CSV
const jsonFilePath = './src/data/datafile.json';

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
    console.log('CSV converted to JSON successfully!');
  })
  .catch((err) => console.error('Error converting CSV to JSON:', err));
