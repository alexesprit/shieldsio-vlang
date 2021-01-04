const {
	getRepoContextFromUrl,
	assertRepoContextIsValid,
	getResponseObject,
} = require('./helper');
const { getColorForVersion } = require('../src/version');

module.exports = { createServerlessFunction };

function createServerlessFunction(endpoint, label, getter) {
	return async (req, res) => {
		const repoContext = getRepoContextFromUrl(req.url, endpoint);

		try {
			assertRepoContextIsValid(repoContext);
		} catch (err) {
			res.status(500).json({ error: err.message });
			return;
		}

		let version = null;
		try {
			version = await getter(repoContext);
		} catch (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		const color = getColorForVersion(version);

		res.json(getResponseObject(label, version, color));
	};
}
