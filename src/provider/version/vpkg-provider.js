module.exports = {
	getVersionFromVpkg,
};

function getVersionFromVpkg(repoContext, fileContents) {
	const vpkgObject = JSON.parse(fileContents);

	return vpkgObject.version;
}
