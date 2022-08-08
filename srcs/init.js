const portName = (chrome.extension.inIncognitoContext ? "incog_comm" : "normal_comm");
const today = new Date();
const dayOfWeek = (today.getDay() > 0 ? today.getDay() - 1 : 6);
const dayOfMonth = today.getDate();
