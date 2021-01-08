const { getFileContents } = require('../contents/github');

module.exports = {
	getVersionFromVpkg,
};

async function getVersionFromVpkg(repoContext) {
	const vpkgContents = await getFileContents(repoContext, 'vpkg.json');
	const vpkgObject = JSON.parse(vpkgContents);

	return vpkgObject.version;
}
