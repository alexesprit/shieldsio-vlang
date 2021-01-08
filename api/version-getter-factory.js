const { getFileContents } = require('../src/provider/contents/github');
const { getVersionFromVmod } = require('../src/provider/version/vmod-provider');
const { getVersionFromVpkg } = require('../src/provider/version/vpkg-provider');

module.exports = { createVmodVersionGetter, createVpkgVersionGetter };

function createVmodVersionGetter() {
	return createVersionGetter(getVersionFromVmod, getFileContents);
}

function createVpkgVersionGetter() {
	return createVersionGetter(getVersionFromVpkg, getFileContents);
}

function createVersionGetter(getter) {
	return (...args) => {
		return getter(...args, getFileContents);
	};
}
