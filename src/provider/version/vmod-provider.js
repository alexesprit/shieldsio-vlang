module.exports = {
	getVersionFromVmod,
};

function getVersionFromVmod(repoContext, fileContents) {
	const matchInfo = fileContents.match(/version:\s*'(.+?)'/);

	if (matchInfo) {
		return matchInfo[1];
	}

	return null;
}
