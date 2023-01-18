(async function() {
	iConsole.log(`Initializing of the Phoenix Dashboard for the student ${getLogin()} !`);
	iConsole.log(`${getLogin()} is Phoenix : ${isPhoenix()}`);
	await getLogtimeStats();
	await showLogtime();
})();
