const http = require('http');

const { getColorForVersion, getVersion } = require('./version');

const port = process.env.PORT || 8888;

function startServer() {
	const server = http.createServer(async (request, response) => {
		const [, owner, repo] = request.url.split('/');

		if (!owner) {
			sendError(response, 'owner name is not specified');
			return;
		}

		if (!repo) {
			sendError(response, 'repo name is not specified');
			return;
		}

		let label = null;
		let version = null;

		try {
			[label, version] = await getVersion(repo, owner);
		} catch (err) {
			sendError(response, err.message);
			return;
		}

		const color = getColorForVersion(version);

		sendJson(response, {
			schemaVersion: 1,
			color: color,
			label: label,
			message: version,
		});
	});

	server.listen(port);
	console.log(`Listening on ${port}`);
}

function sendError(response, message) {
	response.writeHead(500, { 'Content-Type': 'application/json' });
	response.write(serialize({ error: message }, null, 2));
	response.end();
}

function sendJson(response, json) {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.write(serialize(json));
	response.end();
}

function serialize(object) {
	return JSON.stringify(object, null, 2);
}

startServer();
