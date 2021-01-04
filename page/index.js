/* eslint-env browser */

const sourceFilesEndpoints = ['vmod', 'vpkg'];
const outputFormats = ['markdown', 'html'];
const badgeStyles = [
	'plastic',
	'flat',
	'flat-square',
	'for-the-badge',
	'social',
];

const apiUrl = 'https://shieldsio-vlang.vercel.app/api';

let lastResult = null;

function main() {
	setupEventListeners();
}

function setupEventListeners() {
	const generateButton = document.getElementById('button-generate');
	generateButton.addEventListener('click', onGenerateButtonClick);

	const copyOutputButton = document.getElementById('button-copy');
	copyOutputButton.addEventListener('click', onCopyOutputButtonClick);

	const radioButtons = document.getElementsByName('output-format');
	for (const radioButton of radioButtons) {
		radioButton.addEventListener('change', setLastResult);
	}
}

function onGenerateButtonClick() {
	const result = getResult();
	if (!result) {
		return;
	}

	lastResult = result;
	setResult(lastResult);
}

function onCopyOutputButtonClick() {
	const outputContainer = document.getElementById('output-badge');

	outputContainer.select();
	document.execCommand('copy');
	outputContainer.blur();
}

function getResult() {
	const owner = getOwner();
	if (!owner) {
		alert('You should specify your name on GitHub!');
		return null;
	}

	const repo = getRepository();
	if (!repo) {
		alert('You should specify your repository name!');
		return null;
	}

	const endpoint = getSourceFileEndpoint();
	const badgeStyle = getBadgeStyle();

	return { owner, repo, endpoint, badgeStyle };
}

function getOwner() {
	return getTextFromInput('input-owner');
}

function getRepository() {
	return getTextFromInput('input-repository');
}

function getSourceFileEndpoint() {
	return getResultFromRadioButtons('project-file', sourceFilesEndpoints);
}

function getBadgeStyle() {
	return getResultFromRadioButtons('badge-style', badgeStyles);
}

function setResult(result) {
	if (!result) {
		return;
	}

	setOutput(getOutput(result));
	setPreview(result);
}

function setLastResult() {
	setResult(lastResult);
}

function setOutput(outputStr) {
	document.getElementById('output-badge').value = outputStr;
}

function getOutput(result) {
	switch (getOutputFormat()) {
		case 'markdown':
			return getMarkdownOutput(result);
		case 'html':
			return getHtmlOutput(result);
	}
}

function getOutputFormat() {
	return getResultFromRadioButtons('output-format', outputFormats);
}

function getMarkdownOutput(result) {
	const { title, repoUrl, badgeLink } = getOutputInfo(result);

	return `[![${title}](${badgeLink})](${repoUrl})`;
}

function getHtmlOutput(result) {
	const { title, repoUrl, badgeLink } = getOutputInfo(result);

	return `<a href="${repoUrl}"><img src="${badgeLink}" alt="${title}"/></a>`;
}

function setPreview(result) {
	const previewContainer = document.getElementById('badge-preview');
	previewContainer.innerHTML = getHtmlOutput(result);
}

/** Helpers */

function getOutputInfo(result) {
	const { owner, repo, endpoint, badgeStyle } = result;

	const endpointUrl = `${apiUrl}/${endpoint}/${owner}/${repo}`;
	const encodedUrl = encodeURIComponent(endpointUrl);

	const title = 'Project version';
	const repoUrl = `https://github.com/${owner}/${repo}`;
	const badgeLink = `https://img.shields.io/endpoint.svg?url=${encodedUrl}&style=${badgeStyle}`;

	return { title, repoUrl, badgeLink };
}

function getTextFromInput(inputId) {
	return document.getElementById(inputId).value;
}

function getResultFromRadioButtons(radioButtonName, valueArray) {
	const radioButtons = document.getElementsByName(radioButtonName);

	for (let i = 0; i < radioButtons.length; ++i) {
		if (radioButtons[i].checked) {
			return valueArray[i];
		}
	}

	throw new Error('Unexpected error');
}

main();
