const conditionDiv = document.createElement('div');
const conditionLogDiv = document.createElement('div');

async function getLogtimeStats() {
	iConsole.log(`Getting logtime of the current week...`);
	const locationsStats = await fetch(`https://profile.intra.42.fr/users/${getLogin()}/locations_stats.json`);
	const locJSON = await locationsStats.json();
	monthLogtime(locJSON);
	weekLogtime(locJSON);
}

function showMonthLogtime() {
	const	logtimeDiv = document.createElement('div');
	const	logtimeTitleDiv = document.createElement('h3');
	const	logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";
	logtimeDiv.style.paddingRight = '20px';
	if (logtimeMonth.hours >= 96) logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else logtimeContentDiv.style.setProperty("color", "#bd0000", "important");

	logtimeTitleDiv.innerHTML = `Logtime this month\n`;
	if (logtimeMonth.days > 0)
		logtimeContentDiv.innerHTML = `${logtimeMonth.days} days `;
	if (logtimeMonth.hours > 0)
		logtimeContentDiv.innerHTML += `${logtimeMonth.hours} hours `;
	logtimeContentDiv.innerHTML += `${logtimeMonth.minutes} minutes`;
	conditionLogDiv.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}

function showWeekLogtime() {
	const	logtimeDiv = document.createElement('div');
	const	logtimeTitleDiv = document.createElement('h3');
	const	logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";
	if (logtimeWeek.hours >= 24 || logtimeMonth.hours >= 96) logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else logtimeContentDiv.style.setProperty("color", "#bd0000", "important");

	logtimeTitleDiv.innerHTML = `Logtime this week\n`;
	if (logtimeWeek.days > 0)
		logtimeContentDiv.innerHTML = `${logtimeWeek.days} days `;
	if (logtimeWeek.hours > 0)
		logtimeContentDiv.innerHTML += `${logtimeWeek.hours} hours `;
	logtimeContentDiv.innerHTML += `${logtimeWeek.minutes} minutes`;
	conditionLogDiv.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}

function showTimeRemaining() {
	const	logtimeDiv = document.createElement('div');
	const	logtimeTitleDiv = document.createElement('h3');
	const	logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";
	logtimeDiv.style.textAlign = "center";
	if (logtimeMonth.hours >= 96) logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else logtimeContentDiv.style.setProperty("color", "rgb(255, 90, 0)", "important");

	logtimeTitleDiv.innerHTML = `Logtime remaining :\n`;
	if (logtimeMonth.hours >= 96)
		logtimeContentDiv.innerHTML = `0 hours`;
	else
		logtimeContentDiv.innerHTML += `${96 - logtimeMonth.hours} hours`;
	if (logtimeMonth.hours < 96)
	logtimeContentDiv.innerHTML += ` ${60 - logtimeMonth.minutes} minutes`;
	conditionDiv.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}


function showLogtime() {
	const	box = getBox();
	if (!box) return;

	conditionDiv.id = "condition";
	conditionLogDiv.id = "condition_log";
	conditionLogDiv.classList.add("condition_log");
	box.appendChild(conditionDiv);
	showMonthLogtime();
	showWeekLogtime();
	conditionDiv.appendChild(conditionLogDiv);
	if (isPhoenix())
		showTimeRemaining();
}

async function weekLogtime(locJSON) {
	const	_startTime	= new Date();
	_startTime.setDate(_startTime.getDate() - (_startTime.getDay() + 6) % 7);
	_startTime.setHours(0, 0, 0, 0);
	for (let loc in locJSON) {
		const beginAt = new Date(loc);
		beginAt.setHours(0, 0, 0, 0);
		if (beginAt >= _startTime) {
			const [hours, minutes, seconds] = locJSON[loc].split(':').map(Number);

			if (logtimeWeek.seconds + seconds < 60 ) logtimeWeek.seconds += seconds;
			else { logtimeWeek.minutes += 1; logtimeWeek.seconds = (logtimeWeek.seconds + seconds) % 60; }
			if (logtimeWeek.minutes + minutes < 60 ) logtimeWeek.minutes += minutes;
			else { logtimeWeek.hours += 1; logtimeWeek.minutes = (logtimeWeek.minutes + minutes) % 60; }
			if (logtimeWeek.hours + hours < 24 ) logtimeWeek.hours += hours;
			else { logtimeWeek.days += 1; logtimeWeek.hours = (logtimeWeek.hours + hours) % 24; }
		}
	}
}

async function monthLogtime(locJSON) {
	for (let loc in locJSON) {
		const beginAt = new Date(loc);
		beginAt.setHours(0, 0, 0, 0);
		if (beginAt >= startTime) {
			const [hours, minutes, seconds] = locJSON[loc].split(':').map(Number);

			if (logtimeMonth.seconds + seconds < 60 ) logtimeMonth.seconds += seconds;
			else { logtimeMonth.minutes += 1; logtimeMonth.seconds = (logtimeMonth.seconds + seconds) % 60; }
			if (logtimeMonth.minutes + minutes < 60 ) logtimeMonth.minutes += minutes;
			else { logtimeMonth.hours += 1; logtimeMonth.minutes = (logtimeMonth.minutes + minutes) % 60; }
			logtimeMonth.hours += hours;
		}
	}
}
