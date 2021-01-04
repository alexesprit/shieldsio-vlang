const {
	getContextFromUrl,
	assertContextIsValid,
	getResponseObject,
} = require('./helper');
const { getColorForVersion } = require('../src/version');

module.exports = { createServerlessFunction };

function createServerlessFunction(endpoint, label, getter) {
	return async (req, res) => {
		const { owner, repo } = getContextFromUrl(req.url, endpoint);

		try {
			assertContextIsValid({ owner, repo });
		} catch (err) {
			res.status(500).json({ error: err.message });
			return;
		}

		let version = null;
		try {
			version = await getter(repo, owner);
		} catch (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		const color = getColorForVersion(version);

		res.json(getResponseObject(label, version, color));
	};
}
