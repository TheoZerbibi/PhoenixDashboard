/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: thzeribi <thzeribi@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/03 17:29:29 by thzeribi          #+#    #+#             */
/*   Updated: 2023/03/17 05:35:36 by thzeribi         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function isPhoenix() {
	try {
		let data = document.querySelector("[data-badge=phoenix]");
		if (data)
			return (true);
		else return (false);
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

function reverseObj(obj) {
	let		finalObj = {}
	const	tmp = Object.keys(obj).reverse();

	tmp.forEach(function(i) { 
		finalObj[i] = obj[i];
	})
	return (finalObj);
}
