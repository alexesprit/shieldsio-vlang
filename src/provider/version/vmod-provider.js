module.exports = {
	getVersionFromVmod,
};

async function getVersionFromVmod(repoContext, fileContentsProvider) {
	const vmodContents = await fileContentsProvider(repoContext, 'v.mod');
	const matchInfo = vmodContents.match(/version:\s*'(.+?)'/);

	if (matchInfo) {
		return matchInfo[1];
	}

	return null;
}
