const { getFileContents } = require('../provider/contents/github');
const { getVersionFromVmod } = require('../provider/version/vmod-provider');
const { getVersionFromVpkg } = require('../provider/version/vpkg-provider');

module.exports = { createVmodVersionGetter, createVpkgVersionGetter };

function createVmodVersionGetter() {
	return createVersionGetter(getVersionFromVmod, (context) =>
		getFileContents(context, 'v.mod')
	);
}

function createVpkgVersionGetter() {
	return createVersionGetter(getVersionFromVpkg, (context) =>
		getFileContents(context, 'vpkg.json')
	);
}

function createVersionGetter(versionProvider, fileContentsProvider) {
	return async (...args) => {
		const fileContents = await fileContentsProvider(...args);
		return versionProvider(fileContents);
	};
}
