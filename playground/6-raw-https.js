const http = require('http');
//const https = require('https');

const url = 'http://api.weatherstack.com/current?access_key=a3d06124d041e00ccf8b416590c85fc9&query=40,-73&units=m';


const request = http.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        //console.log(data);
        const body = JSON.parse(data);
        console.log(body);
    })
});

request.on('error', (error) => {
    console.log('Error:', error);
});

request.end();

