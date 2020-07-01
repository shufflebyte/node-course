const fs = require('fs');
/* 
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}

// create JSON from OBJECT
const bookJSON = JSON.stringify(book);
console.log(bookJSON);

// CREATE OBJECT FROM JSON
const myBook = JSON.parse(bookJSON);
console.log(myBook.author);

// Write JSON to FILE
fs.writeFileSync('1-json.json', bookJSON);

// Read JSON from FILE (BINARY) and convert to STRING (==JSON)
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString()
//console.log(dataBuffer);
//console.log(dataBuffer.toString());

// CREATE OBJECT FROM JSON
const data = JSON.parse(dataJSON);
console.log(data); */

// challenge
json_file_path = '1-json.json';
const dataJSON = fs.readFileSync(json_file_path).toString()
var data = JSON.parse(dataJSON);

data.name = 'Hugo Horst';
data.planet = 'Mars';
data.age = 55;

stringifiedData = JSON.stringify(data);
fs.writeFileSync(json_file_path, stringifiedData);