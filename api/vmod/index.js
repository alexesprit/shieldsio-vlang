const {
	getContextFromUrl,
	assertContextIsValid,
	getResponseObject,
} = require('../helper');
const { getVersionFromVmod, getColorForVersion } = require('../../src/version');

module.exports = async (req, res) => {
	const { owner, repo } = getContextFromUrl(req.url, 'vmod');

	try {
		assertContextIsValid({ owner, repo });
	} catch (err) {
		res.status(500).json({ error: err.message });
		return;
	}

	let version = null;
	try {
		version = await getVersionFromVmod(repo, owner);
	} catch (err) {
		res.status(500).json({ error: err.message });
		return;
	}
	const color = getColorForVersion(version);

	res.json(getResponseObject('v.mod', version, color));
};
