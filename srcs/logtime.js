const	conditionDiv = document.createElement('div');
const	conditionLogDiv = document.createElement('div');
let		monthTotalHours = 0;

function initLogtimeBox()
{
		const	box = getBox();
		if (!box) return;
	
		conditionDiv.id = "condition";
		conditionLogDiv.id = "condition_log";
		conditionLogDiv.classList.add("condition_log");
		box.appendChild(conditionDiv);
}

async function getLogtimeStats() {
	iConsole.log(`Getting and calculate logtime...`);
	const locationsStats = await fetch(`https://profile.intra.42.fr/users/${getLogin()}/locations_stats.json`);
	const locJSON = await locationsStats.json();
	let locFinal = reverseObj(locJSON);
	getLogTime(locFinal, monthStart, monthLogtime);
	getLogTime(locFinal, weekStart, weekLogtime);
	conditionDiv.appendChild(conditionLogDiv);
	if (isPhoenix())
		getLogTime(locFinal, monthStart, timeRemaining);
}

async function getLogTime(locJSON, startTime, showFunction)
{
	const	logtime = { days:0, hours:0, minutes:0, seconds:0, total_hours:0 };

	for (let loc in locJSON) {
		const beginAt = new Date(loc);
		beginAt.setHours(0, 0, 0, 0);
		if (beginAt >= startTime) {
			const [hours, minutes, seconds] = locJSON[loc].split(':').map(Number);

			if (logtime.seconds + seconds < 60 ) logtime.seconds += seconds;
			else { logtime.minutes += 1; logtime.seconds = (logtime.seconds + seconds) % 60; }
			if (logtime.minutes + minutes < 60 ) logtime.minutes += minutes;
			else { logtime.hours += 1; logtime.total_hours += 1; logtime.minutes = (logtime.minutes + minutes) % 60; }
			if (logtime.hours + hours < 24 ) logtime.hours += hours;
			else { logtime.days += 1; logtime.hours = (logtime.hours + hours) % 24; }
			logtime.total_hours += hours;
		}
	}
	
	showFunction(logtime);
}

function monthLogtime(logtime)
{
	const	logtimeDiv = document.createElement('div');
	const	logtimeTitleDiv = document.createElement('h3');
	const	logtimeContentDiv = document.createElement('h4');

	monthTotalHours = logtime.total_hours;
	logtimeContentDiv.style.textAlign = "center";
	logtimeDiv.style.paddingRight = '20px';
	if (logtime.hours >= 96) logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else logtimeContentDiv.style.setProperty("color", "#bd0000", "important");

	logtimeTitleDiv.innerHTML = `Logtime this month\n`;
	if (logtime.total_hours > 0)
		logtimeContentDiv.innerHTML += `${logtime.total_hours} hours `;
	logtimeContentDiv.innerHTML += `${logtime.minutes} minutes`;
	conditionLogDiv.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}

function weekLogtime(logtime) {
	const	logtimeDiv = document.createElement('div');
	const	logtimeTitleDiv = document.createElement('h3');
	const	logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";
	if (logtime.hours >= 24 || monthTotalHours >= 96) logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else logtimeContentDiv.style.setProperty("color", "#bd0000", "important");

	logtimeTitleDiv.innerHTML = `Logtime this week\n`;
	if (logtime.days > 0)
		logtimeContentDiv.innerHTML = `${logtime.days} days `;
	if (logtime.hours > 0)
		logtimeContentDiv.innerHTML += `${logtime.hours} hours `;
	logtimeContentDiv.innerHTML += `${logtime.minutes} minutes`;
	conditionLogDiv.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}

function timeRemaining(logtime) {
	const	logtimeDiv = document.createElement('div');
	const	logtimeTitleDiv = document.createElement('h3');
	const	logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";
	logtimeDiv.style.textAlign = "center";
	if (logtime.total_hours >= 96)
		logtimeContentDiv.style.setProperty("color", "#009407", "important");
	else
		logtimeContentDiv.style.setProperty("color", "rgb(255, 90, 0)", "important");

	logtimeTitleDiv.innerHTML = `Logtime remaining :\n`;
	if (logtime.total_hours >= 96)
		logtimeContentDiv.innerHTML = `0 hour`;
	else
		logtimeContentDiv.innerHTML += `${(logtime.total_hours > 0) ? ((96 - logtime.total_hours) - 1) : 96} hours`;
	if (logtime.total_hours < 96)	
		logtimeContentDiv.innerHTML += ` ${60 - logtime.minutes} minutes`;
	conditionDiv.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}
