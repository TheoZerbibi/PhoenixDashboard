/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: thzeribi <thzeribi@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/03 17:29:29 by thzeribi          #+#    #+#             */
/*   Updated: 2022/10/12 19:36:08 by thzeribi         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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