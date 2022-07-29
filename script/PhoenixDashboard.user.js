// ==UserScript==
// @name         PhoenixDashboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Dashboard for Phoenix in 42 Intra
// @author       thzeribi
// @match        https://profile.intra.42.fr/*
// @icon         https://cdn.discordapp.com/icons/964522196703793172/ad8236d4fbd047316ed2297d504ba136.webp
// @grant        none
// @run-at document-end
// ==/UserScript==

let login, box;

function PhoenixConsole() {
	for (let c in console) {
		if (typeof console[c] == 'function') {
			this[c] = console[c].bind(console, "%c[Phoenix DashBoard]%c", "color: #f99e3b;", "");
		}
	}

	this["time"] = console.time.bind(console, "[Phoenix DashBoard]");
	this["timeLog"] = console.timeLog.bind(console, "[Phoenix DashBoard]");
	this["timeEnd"] = console.timeEnd.bind(console, "[Phoenix DashBoard]");
}

const iConsole = new PhoenixConsole();

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

	box = getBox();
	login = getLogin();

	if (!box || !login) return (false);
	iConsole.log(`Initializing of the Phoenix Dashboard for the student ${login} !`);

	GM_addStyle("#logtime_container { display: flex!important; }");
	box.classList.remove("hidden");
	box.replaceChildren();
	return (true);
}

(function() {
	'use strict';
	if (!init()) return;
	iConsole.log(`${login} is Phoenix : ${isPhoenix()}`);
	iConsole.log(`Getting logtime of the current week...`);
})();