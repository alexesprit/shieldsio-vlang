const { processApiRequest } = require('./process-api-request');

module.exports = { createServerlessFunction };

function createServerlessFunction(label, versionProvider) {
	return async (req, res) => {
		const response = await processApiRequest(
			req.url,
			label,
			versionProvider
		);

		const statusCode = response.error ? 500 : 200;
		res.status(statusCode).json(response);
	};
}
