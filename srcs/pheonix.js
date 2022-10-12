// let logtime = {days:0, hours:0, minutes:0, seconds:0};

function showEvaluation() {
	const box = getBox();
	if (box == null) return ;

	let corrDiv = document.createElement('div');
	let corrTitleDiv = document.createElement('h3');
	let corrContentDiv = document.createElement('h4');
	corrContentDiv.style.textAlign = "center";

	corrTitleDiv.innerHTML = `Evaluation this week :\n`;
	corrContentDiv.innerHTML += `WiP`;
	box.appendChild(corrDiv);
	corrDiv.appendChild(corrTitleDiv);
	corrDiv.appendChild(corrContentDiv);
}

async function getEvaluationStats() {
	iConsole.log(`Getting logtime of the current week...`);
	const evalStats = await fetch(`https://projects.intra.42.fr/users/thzeribi/feedbacks`);
	console.log(evalStats.text());
}

(async function() {
	iConsole.log(`Initializing of the Phoenix Dashboard for the student ${getLogin()} !`);
	iConsole.log(`${getLogin()} is Phoenix : ${isPhoenix()}`);
	await getLogtimeStats();
	await showLogtime();

	// await getEvaluationStats();
	// await showEvaluation();
})();