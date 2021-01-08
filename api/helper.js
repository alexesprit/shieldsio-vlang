module.exports = {
	getRepoContextFromUrl,
	assertRepoContextIsValid,
	createErrorResponse,
	createSuccessResponse,
};

function getRepoContextFromUrl(url, endpointName) {
	const paths = url.split('/').slice(1);
	const startIndex = paths.indexOf(endpointName) + 1;

	const owner = paths[startIndex + 0] || null;
	const repo = paths[startIndex + 1] || null;
	const branch = paths[startIndex + 2] || null;

	return { owner, repo, branch };
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

function createSuccessResponse(label, version) {
	return {
		schemaVersion: 1,
		color: getColorForVersion(version),
		label: label,
		message: version,
		cacheSeconds: 3600,
	};
}

function createErrorResponse(err) {
	const message = err instanceof Error ? err.message : err;
	return { error: message };
}

function getColorForVersion(version) {
	return isVersionMinor(version) ? 'orange' : 'blue';
}

function isVersionMinor(version) {
	return version.startsWith('0.') || version.startsWith('v0.');
}
