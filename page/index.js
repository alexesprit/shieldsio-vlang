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

const restoreCopyButtonLabelTimeout = 2000;

const apiUrl = 'https://shieldsio-vlang.vercel.app/api';

let lastResult = null;

function main() {
	setupEventListeners();
}

function setupEventListeners() {
	const generateButton = document.getElementById('button-generate');
	generateButton.addEventListener('click', generateBadge);

	const copyOutputButton = document.getElementById('button-copy');
	copyOutputButton.addEventListener('click', onCopyOutputButtonClick);

	const radioButtons = document.getElementsByName('output-format');
	for (const radioButton of radioButtons) {
		radioButton.addEventListener('change', setLastResult);
	}

	const contextInputs = document.getElementsByName('context-input');
	for (const contextInput of contextInputs) {
		contextInput.addEventListener('keyup', onContextInputKeyUp);
	}
}

function onCopyOutputButtonClick() {
	const outputContainer = document.getElementById('output-badge');

	outputContainer.select();
	document.execCommand('copy');
	outputContainer.blur();

	const copyOutputButton = document.getElementById('button-copy');
	setTemporalTextContent(
		copyOutputButton,
		'Copied!',
		restoreCopyButtonLabelTimeout
	);
}

function onContextInputKeyUp({ keyCode }) {
	if (keyCode === 13) {
		generateBadge();
	}
}

function generateBadge() {
	if (!validateInputs()) {
		return;
	}

	const result = getResult();
	if (!result) {
		return;
	}

	lastResult = result;
	setResult(lastResult);
}

function validateInputs() {
	const inputsToValidate = ['input-owner', 'input-repository'];
	let areAllInputsValid = true;

	for (const inputId of inputsToValidate) {
		if (!validateInput(inputId, isNotEmpty)) {
			areAllInputsValid = false;
		}
	}

	return areAllInputsValid;
}

function getResult() {
	const owner = getOwner();
	const repo = getRepository();

	if (!(owner || repo)) {
		return null;
	}

	const gitRef = getGitRef();

	const endpoint = getSourceFileEndpoint();
	const badgeStyle = getBadgeStyle();

	return { owner, repo, gitRef, endpoint, badgeStyle };
}

function getOwner() {
	return getTextFromInput('input-owner');
}

function getRepository() {
	return getTextFromInput('input-repository');
}

function getGitRef() {
	return getTextFromInput('input-git-ref');
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
	const { owner, repo, gitRef, endpoint, badgeStyle } = result;

	const escapedOwner = encodeURIComponent(owner);
	const escapedRepo = encodeURIComponent(repo);

	let endpointUrl = `${apiUrl}/${endpoint}/${owner}/${repo}`;
	if (gitRef) {
		endpointUrl += `/${gitRef}`;
	}
	const encodedUrl = encodeURIComponent(endpointUrl);

	const title = 'Project version';
	const repoUrl = `https://github.com/${escapedOwner}/${escapedRepo}`;
	const badgeLink = `https://img.shields.io/endpoint.svg?url=${encodedUrl}&style=${badgeStyle}`;

	return { title, repoUrl, badgeLink };
}

function getTextFromInput(inputId) {
	return document.getElementById(inputId).value.trim();
}

function validateInput(inputId, checkFn) {
	const inputElement = document.getElementById(inputId);
	const inputValue = inputElement.value;

	const inputHint = inputElement.nextElementSibling;
	const isValueValid = checkFn(inputValue);

	inputElement.classList.toggle('is-error', !isValueValid);
	inputHint.hidden = isValueValid;

	return isValueValid;
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

function setTemporalTextContent(el, text, timeout) {
	if (el.getAttribute('data-temporal-label')) {
		return;
	}

	const previousLabel = el.textContent;
	el.textContent = text;
	el.setAttribute('data-temporal-label', true);

	setTimeout(() => {
		el.textContent = previousLabel;
		el.removeAttribute('data-temporal-label');
	}, timeout);
}

function isNotEmpty(input) {
	return !!input.trim();
}

main();
