const { getRepoContextFromUrl, assertRepoContextIsValid } = require('./helper');
const {
	createErrorResponse,
	createSuccessResponse,
} = require('./response-factory');

async function processApiRequest(url, label, versionProvider) {
	const repoContext = getRepoContextFromUrl(url);

	try {
		assertRepoContextIsValid(repoContext);
	} catch (err) {
		return createErrorResponse(err);
	}

	let version = null;
	try {
		version = await versionProvider(repoContext);
	} catch (err) {
		return createErrorResponse(err);
	}

	return createSuccessResponse(label, version);
}
exports.processApiRequest = processApiRequest;
