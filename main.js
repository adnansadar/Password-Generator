const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

generate.addEventListener('click', () => {
	const length = +lengthEl.value; //we use + to change the data type to number from string
	const hasLower = lowercaseEl.checked; //.checked is a property returning true/false
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	//1. Initialize pw variable
	//2. filter unchecked types
	//3. Loop over length call generator function for each type
	//4. Add final pw to the pw var and return
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{
		lower
	}, {
		upper
	}, {
		number
	}, {
		symbol
	}].filter(item => Object.values(item)[0]); //0 used to filter out false values
	//{} used to convert the array into an array of objects with key value 
	// Doesn't have a selected type
	if (typesCount === 0) {
		return '';
	}

	// create a loop
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0]; //returns the key(number,symbol,lowercase..)
			generatedPassword += randomFunc[funcName]();
		});
	}

	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

function getRandomLower() { //Using ASCII nos so 97+26 range is used
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() { //Using ASCII nos so 65+26 range is used
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() { //0-9 nos and ASCII starts from 48
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() { //
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}