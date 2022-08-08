let logtime = {days:0, hours:0, minutes:0, seconds:0};

async function getLogtimeStats() {
	iConsole.log(`Getting logtime of the current week...`);
	const locationsStats = await fetch(`https://profile.intra.42.fr/users/${getLogin()}/locations_stats.json`);
	const locJSON = await locationsStats.json();
	// convertLogtime(locJSON);
}

function showLogtime() {
	const box = getBox();

	let logtimeDiv = document.createElement('div');
	let logtimeTitleDiv = document.createElement('h3');
	let logtimeContentDiv = document.createElement('h4');
	logtimeContentDiv.style.textAlign = "center";

	logtimeTitleDiv.innerHTML = `Logtime this week :\n`;
	logtimeContentDiv.innerHTML = `WiP`;
	box.appendChild(logtimeDiv);
	logtimeDiv.appendChild(logtimeTitleDiv);
	logtimeDiv.appendChild(logtimeContentDiv);
}