const { getFileContents } = require('./provider/github');

module.exports = {
	getVersionFromVpkg,
	getVersionFromVmod,
};

async function getVersionFromVpkg(repoContext) {
	const vpkgContents = await getFileContents(repoContext, 'vpkg.json');
	const vpkgObject = JSON.parse(vpkgContents);

	return vpkgObject.version;
}

async function getVersionFromVmod(repoContext) {
	const vmodContents = await getFileContents(repoContext, 'v.mod');
	const matchInfo = vmodContents.match(/version:\s*'(.+?)'/);

	if (matchInfo) {
		return matchInfo[1];
	}

	return null;
}
