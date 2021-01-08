module.exports = {
	getVersionFromVpkg,
};

function getVersionFromVpkg(fileContents) {
	let vpkgObject = null;

	try {
		vpkgObject = JSON.parse(fileContents);
	} catch (err) {
		throw new Error('Invalid vpkg.json file');
	}

	if ('version' in vpkgObject) {
		return vpkgObject.version;
	}

	throw new Error('vpkg.json file does not contain version info');
}
