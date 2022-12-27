let logtime			= { days:0, hours:0, minutes:0, seconds:0 };

const	portName	= (chrome.extension.inIncognitoContext ? "incog_comm" : "normal_comm");
const	today		= new Date();
const	dayOfWeek	= (today.getDay() > 0 ? today.getDay() - 1 : 6);
const	dayOfMonth	= today.getDate();

const	startTime	= new Date();
const	endAt		= new Date();
startTime.setDate(startTime.getDate() - today.getDate());
startTime.setHours(0, 0, 0, 0);
endAt.setHours(0, 0, 0, 0);
