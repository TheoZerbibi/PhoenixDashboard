// let logtime = {days:0, hours:0, minutes:0, seconds:0};

// function showCorrection() {
// 	let corrDiv = document.createElement('div');
// 	let corrTitleDiv = document.createElement('h3');
// 	let corrContentDiv = document.createElement('h4');
// 	corrContentDiv.style.textAlign = "center";

// 	corrTitleDiv.innerHTML = `Correction this week :\n`;
// 	corrContentDiv.innerHTML += `WiP`;
// 	box.appendChild(corrDiv);
// 	corrDiv.appendChild(corrTitleDiv);
// 	corrDiv.appendChild(corrContentDiv);
// }

// function showLogtime() {
// 	let logtimeDiv = document.createElement('div');
// 	let logtimeTitleDiv = document.createElement('h3');
// 	let logtimeContentDiv = document.createElement('h4');
// 	logtimeContentDiv.style.textAlign = "center";

// 	logtimeTitleDiv.innerHTML = `Logtime this week :\n`;
// 	/*if (logtime.days > 0)
// 		logtimeContentDiv.innerHTML = `${logtime.days} jours `;
// 	if (logtime.hours > 0)
// 		logtimeContentDiv.innerHTML += `${logtime.hours} heures `;
// 	logtimeContentDiv.innerHTML += `${logtime.minutes} minutes`;*/
//     logtimeContentDiv.innerHTML = "C kc :/";
// 	box.appendChild(logtimeDiv);
// 	logtimeDiv.appendChild(logtimeTitleDiv);
// 	logtimeDiv.appendChild(logtimeContentDiv);
// }

// async function convertLogtime(locJSON) {
// 	console.log(locJSON);
// 	const startTime = new Date();
// 	startTime.setDate(startTime.getDate() - (startTime.getDay() + 6) % 7);
// 	startTime.setHours(0, 0, 0);
// 	for (let loc in locJSON) {
// 		let begin_at = new Date(loc);
// 		begin_at.setHours(0, 0, 0);
// 		// console.log(`${loc} : ${(begin_at.getDay() == startTime.getDay() && begin_at.getMonth() == startTime.getMonth())}`);
// 		if (begin_at.getTime() >= startTime.getTime() || (begin_at.getDay() == startTime.getDay() && begin_at.getMonth() == startTime.getMonth()))
// 		{
// 			console.log(loc);
// 			console.log(locJSON[loc]);
// 			let [hours, minutes, seconds] = locJSON[loc].split(':').map(Number);
// 			(logtime.seconds + seconds < 60) ? logtime.seconds += seconds : logtime.minutes += 1, logtime.seconds = seconds % 60;
// 			(logtime.minutes + minutes < 60) ? logtime.minutes += minutes : logtime.hours += 1, logtime.minutes = minutes % 60;
// 			(logtime.hours + hours < 24) ? logtime.hours += hours : logtime.days += 1, logtime.hours = hours % 24;
// 		}
// 	}
// 	console.log(logtime);
// }

// async function getLogtimeStats() {
// 	iConsole.log(`Getting logtime of the current week...`);
// 	const locationsStats = await fetch(`https://profile.intra.42.fr/users/${login}/locations_stats.json`);
// 	const locJSON = await locationsStats.json();
// 	convertLogtime(locJSON);
// }

(async function() {
	iConsole.log(`Initializing of the Phoenix Dashboard for the student ${getLogin()} !`);
	iConsole.log(`${getLogin()} is Phoenix : ${isPhoenix()}`);
	await getLogtimeStats();
	await showLogtime();
	// await showCorrection();
})();