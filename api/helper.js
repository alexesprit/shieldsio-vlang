module.exports = {
	getRepoContextFromUrl,
	assertRepoContextIsValid,
};

function getRepoContextFromUrl(url) {
	// Format is /api/:provider/:owner/:repo
	const paths = url.split('/').slice(3);
	const [owner = null, repo = null, branch = null] = paths;

	return { owner, repo, branch };
}

function assertRepoContextIsValid(repoContext) {
	const { owner, repo } = repoContext;

	if (!owner) {
		throw new Error('owner name is not specified');
	}

	if (!repo) {
		throw new Error('repo name is not specified');
	}
}
