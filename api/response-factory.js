module.exports = { createErrorResponse, createSuccessResponse };

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
