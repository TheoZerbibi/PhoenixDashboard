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
	if (logtime.hours >= 100) logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else logtimeContentDiv.style.setProperty("color", "#bd0000", "important");

	logtimeTitleDiv.innerHTML = `Logtime this month :\n`;
	if (logtime.days > 0)
		logtimeContentDiv.innerHTML = `${logtime.days} days `;
	if (logtime.hours > 0)
		logtimeContentDiv.innerHTML += `${logtime.hours} hours `;
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
			logtime.hours += hours;
		}
	}
}
