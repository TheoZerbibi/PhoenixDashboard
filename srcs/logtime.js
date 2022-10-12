async function getLogtimeStats() {
	iConsole.log(`Getting logtime of the current week...`);
	const locationsStats = await fetch(`https://profile.intra.42.fr/users/${getLogin()}/locations_stats.json`);
	const locJSON = await locationsStats.json();
	convertLogtime(locJSON);
}

function showLogtime() {
	const box = getBox();
	if (box == null) return ;

	let logtimeDiv = document.createElement('div');
	let logtimeTitleDiv = document.createElement('h3');
	let logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";

	logtimeTitleDiv.innerHTML = `Logtime this week :\n`;
	if (logtime.days > 0)
		logtimeContentDiv.innerHTML = `${logtime.days} jours `;
	if (logtime.hours > 0)
		logtimeContentDiv.innerHTML += `${logtime.hours} heures `;
	logtimeContentDiv.innerHTML += `${logtime.minutes} minutes`;
	box.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}

async function convertLogtime(locJSON) {
	for (let loc in locJSON) {
		const beginAt = new Date(loc);
		beginAt.setHours(0, 0, 0, 0);
		if (beginAt >= startTime) {
			const [hours, minutes, seconds] = locJSON[loc].split(':').map(Number);

			if (logtime.seconds + seconds < 60 ) logtime.seconds += seconds;
			else { logtime.minutes += 1; logtime.seconds = (logtime.seconds + seconds) % 60; }
			if (logtime.minutes + minutes < 60 ) logtime.minutes += minutes;
			else { logtime.hours += 1; logtime.minutes = (logtime.minutes + minutes) % 60; }
			if (logtime.hours + hours < 24 ) logtime.hours += hours;
			else { logtime.days += 1; logtime.hours = (logtime.hours + hours) % 24; }
		}
	}
}