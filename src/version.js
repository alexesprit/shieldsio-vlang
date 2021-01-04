const { getFileContents } = require('./provider/github');

module.exports = {
	getVersionFromVpkg,
	getVersionFromVmod,
	getColorForVersion,
};

function getColorForVersion(version) {
	return isVersionMinor(version) ? 'orange' : 'blue';
}

async function getVersionFromVpkg(owner, repo) {
	const vpkgContents = await getFileContents(owner, repo, 'vpkg.json');
	const vpkgObject = JSON.parse(vpkgContents);

	return vpkgObject.version;
}

async function getVersionFromVmod(owner, repo) {
	const vmodContents = await getFileContents(owner, repo, 'v.mod');
	const matchInfo = vmodContents.match(/version:\s*'(.+?)'/);

	if (matchInfo) {
		return matchInfo[1];
	}

	return null;
}

function isVersionMinor(version) {
	return version.startsWith('0.') || version.startsWith('v0.');
}
