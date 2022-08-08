/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   console.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: thzeribi <thzeribi@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/03 17:29:27 by thzeribi          #+#    #+#             */
/*   Updated: 2022/08/03 17:29:28 by thzeribi         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function PhoenixConsole() {
	for (let c in console) {
		if (typeof console[c] == 'function') {
			this[c] = console[c].bind(console, "%c[Phoenix DashBoard]%c", "color: #f99e3b;", "");
		}
	}
}

const iConsole = new PhoenixConsole();