(async function() {
	if (isPhoenix()) {
		const goalsContainer = document.getElementById("goals_container");

		if (goalsContainer) {
			iConsole.log(`Remove BlackHole Box`);
			goalsContainer.style.display = "none";
		}
	}
})();