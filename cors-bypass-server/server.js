// MeteoSwiss has an API but they won't make it available to cross-site requests.
// This server simply bypasses CORS by fetching the API server-side and wraps it
// in a CORS-enabled endpoint.

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	if (req.url === '/meteo') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		fetch('https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=803200')
			.then(data => data.text())
			.then(data => res.end(data));
	} else if (req.url === '/entsorgung') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		const today = new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' });
		const tomorrow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' }));
		tomorrow.setDate(tomorrow.getDate() + 1);
		const todayFmt = formatDate(new Date(today));
		const tomorrowFmt = formatDate(new Date(tomorrow));

		fetch(`https://openerz.metaodi.ch/api/calendar.json?region=zurich&zip=8032&types=paper&types=cardboard&start=${todayFmt}&end=${tomorrowFmt}&sort=date&offset=0&limit=1`)
			.then(data => data.text())
			.then(data => res.end(data));
	}
});

const formatDate = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
