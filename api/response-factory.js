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
	return isVersionV0(version) ? 'orange' : 'blue';
}

function isVersionV0(version) {
	return version.startsWith('0.') || version.startsWith('v0.');
}
