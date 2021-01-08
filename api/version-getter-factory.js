const { getFileContents } = require('../src/provider/contents/github');
const { getVersionFromVmod } = require('../src/provider/version/vmod-provider');
const { getVersionFromVpkg } = require('../src/provider/version/vpkg-provider');

module.exports = { createVmodVersionGetter, createVpkgVersionGetter };

function createVmodVersionGetter() {
	return createVersionGetter(getVersionFromVmod, (...args) =>
		getFileContents(...args, 'v.mod')
	);
}

function createVpkgVersionGetter() {
	return createVersionGetter(getVersionFromVpkg, (...args) =>
		getFileContents(...args, 'vpkg.json')
	);
}

function createVersionGetter(getter, fileContentsProvider) {
	return async (...args) => {
		const fileContents = await fileContentsProvider(...args);
		return getter(...args, fileContents);
	};
}