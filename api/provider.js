const { Octokit } = require('@octokit/rest');

const githubToken = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: githubToken });

module.exports = { getFileContents };

async function getFileContents(repo, owner, fileName) {
	const { data } = await octokit.repos.getContent({
		owner: owner,
		repo: repo,
		path: fileName,
	});

	return Buffer.from(data.content, 'base64').toString();
}
