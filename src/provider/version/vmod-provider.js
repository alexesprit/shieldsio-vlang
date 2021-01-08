const { getFileContents } = require('../contents/github');

module.exports = {
	getVersionFromVmod,
};

async function getVersionFromVmod(repoContext) {
	const vmodContents = await getFileContents(repoContext, 'v.mod');
	const matchInfo = vmodContents.match(/version:\s*'(.+?)'/);

	if (matchInfo) {
		return matchInfo[1];
	}

	return null;
}
