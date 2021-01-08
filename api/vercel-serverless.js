const {
	getRepoContextFromUrl,
	assertRepoContextIsValid,
	createErrorResponse,
	createSuccessResponse,
} = require('./helper');

module.exports = { createServerlessFunction };

function createServerlessFunction(endpoint, label, getter) {
	return async (req, res) => {
		const response = await processApiRequest(
			req.url,
			endpoint,
			label,
			getter
		);

		const statusCode = response.error ? 500 : 200;
		res.status(statusCode).json(response);
	};
}

async function processApiRequest(url, endpoint, label, getter) {
	const repoContext = getRepoContextFromUrl(url, endpoint);

	try {
		assertRepoContextIsValid(repoContext);
	} catch (err) {
		return createErrorResponse(err);
	}

	let version = null;
	try {
		version = await getter(repoContext);
	} catch (err) {
		return createErrorResponse(err);
	}

	return createSuccessResponse(label, version);
}
