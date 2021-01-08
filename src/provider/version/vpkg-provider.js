module.exports = {
	getVersionFromVpkg,
};

async function getVersionFromVpkg(repoContext, fileContentsProvider) {
	const vpkgContents = await fileContentsProvider(repoContext, 'vpkg.json');
	const vpkgObject = JSON.parse(vpkgContents);

	return vpkgObject.version;
}
