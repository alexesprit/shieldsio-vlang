module.exports = {
	getRepoContextFromUrl,
	assertRepoContextIsValid,
	getResponseObject,
};

function getRepoContextFromUrl(url, endpointName) {
	const paths = url.split('/').slice(1);
	const startIndex = paths.indexOf(endpointName) + 1;

	const owner = paths[startIndex + 0] || null;
	const repo = paths[startIndex + 1] || null;

	return { owner, repo };
}

function assertRepoContextIsValid(repoContext) {
	const { owner, repo } = repoContext;

	if (!owner) {
		throw new Error('owner name is not specified');
	}

	if (!repo) {
		throw new Error('repo name is not specified');
	}
}

function getResponseObject(label, version, color) {
	return {
		schemaVersion: 1,
		color: color,
		label: label,
		message: version,
		cacheSeconds: 3600,
	};
}
