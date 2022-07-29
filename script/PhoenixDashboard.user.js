// ==UserScript==
// @name         PhoenixDashboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://profile.intra.42.fr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=42.fr
// @grant        none
// @run-at document-end
// ==/UserScript==

let login, box;

function ImprovedConsole() {
	for (let c in console) {
		if (typeof console[c] == 'function') {
			this[c] = console[c].bind(console, "%c[Pheonix DashBoard]%c", "color: #f99e3b;", "");
		}
	}

	this["time"] = console.time.bind(console, "[Pheonix DashBoard]");
	this["timeLog"] = console.timeLog.bind(console, "[Pheonix DashBoard]");
	this["timeEnd"] = console.timeEnd.bind(console, "[Pheonix DashBoard]");
}

const iConsole = new ImprovedConsole();

function GM_addStyle(css) {
	const style = document.getElementById("GM_addStyleBy8626") || (function() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.id = "GM_addStyleBy8626";
		document.head.appendChild(style);
		return style;
	})();
	const sheet = style.sheet;
	sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

function isPhoenix() {
	try {
		document.querySelector(".user-badge").getAttribute("data-badge");
		return (true);
	} catch (err) {
		return (false);
	}
}

function getBox() {
	try {
		return (document.getElementById('logtime_container'));
	}
	catch (err) {
		return (null);
	}
}

function getLogin() {
	try {
		return (document.querySelector(".login[data-login]").getAttribute("data-login"));
	}
	catch (err) {
		return (null);
	}
}

function init()
{
	GM_addStyle("#logtime_container { display: flex!important; }");

	box = getBox();
	login = getLogin();

	if (!box || !login) return (false);
	iConsole.log(`Initializing of the Pheonix Dashboard for the student ${login} !`);

	box.classList.remove("hidden");
	box.replaceChildren();
	return (true);
}

(function() {
	'use strict';
	if (!init()) return;
	iConsole.log(`${login} is Pheonix : ${isPhoenix()}`);
	iConsole.log(`Getting logtime of the current week...`);
})();