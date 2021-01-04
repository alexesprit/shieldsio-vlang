const { Octokit } = require('@octokit/rest');

const githubToken = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: githubToken });

module.exports = { getFileContents };

async function getFileContents(repoContext, fileName) {
	const { owner, repo, branch } = repoContext;

	const { data } = await octokit.repos.getContent({
		owner: owner,
		repo: repo,
		ref: branch || undefined,

		path: fileName,
	});

	return Buffer.from(data.content, 'base64').toString();
}
