// MeteoSwiss has an API but they won't make it available to cross-site requests.
// This server simply bypasses CORS by fetching the API server-side and wraps it
// in a CORS-enabled endpoint.

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'application/json');
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  fetch('https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=803200')
	      .then(data => data.text())
	      .then(data => res.end(data));
});

server.listen(port, hostname, () => {
	  console.log(`Server running at http://${hostname}:${port}/`);
});
