const { getFileContents } = require('./provider');

module.exports = { getVersion, getColorForVersion };

const providers = {
	'v.mod': getVersionFromVmod,
	vpkg: getVersionFromVpkgJson,
};

function getColorForVersion(version) {
	return isVersionMinor(version) ? 'orange' : 'blue';
}

async function getVersion(owner, repo) {
	for (const providerName in providers) {
		const getter = providers[providerName];

		let version = null;
		try {
			version = await getter(owner, repo);
		} catch (err) {
			// TODO Throw error?
		}

		if (version) {
			return [providerName, version];
		}
	}

	throw new Error(`Unable to get version for ${repo}/${owner}`);
}

async function getVersionFromVpkgJson(owner, repo) {
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
