const { getFileContents } = require('../provider/contents/github');
const { getVersionFromVmod } = require('../provider/version/vmod-provider');
const { getVersionFromVpkg } = require('../provider/version/vpkg-provider');

module.exports = { createVmodVersionGetter, createVpkgVersionGetter };

function createVmodVersionGetter() {
	return createFileVersionProvider(getVersionFromVmod, 'v.mod');
}

function createVpkgVersionGetter() {
	return createFileVersionProvider(getVersionFromVpkg, 'vpkg.json');
}

function createFileVersionProvider(versionProvider, fileName) {
	return async (context) => {
		const fileContents = await getFileContents(context, fileName);
		return versionProvider(fileContents);
	};
}
