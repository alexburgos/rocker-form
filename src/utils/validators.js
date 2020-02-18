/* Validators */

/* eslint-disable no-useless-escape*/
const PHONE_REGEX = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const SSN_REGEX = /^(\d{2}){0,1}(\d{2})(\d{2})(\d{2})([\-|\+]{0,1})?(\d{3})(\d{0,1})$/;

// validate Swedish person id number using checksum
function testDate(year, month, day) {
	const date = new Date(year, month, day);
	return !(
		+date
			.getFullYear()
			.toString()
			.slice(2) !== +year ||
		date.getMonth() !== +month ||
		date.getDate() !== +day
	);
}

export function isValidPersonNumber(personNumber) {
	personNumber = personNumber.replace(/\D/g, ''); // remove all non numeric characters
	const personNumberArray = personNumber
		.split('')
		.reverse()
		.slice(0, 10);

	const match = personNumber.match(SSN_REGEX);

	if (
		personNumberArray.length !== 10 ||
		personNumberArray.length > 10 ||
		!match
	)
		return false;

	const validDate = testDate(match[2], match[3], match[4]);

	if (!validDate) return false;

	var sum = personNumberArray
		.map(n => Number(n))
		.reduce(function(previous, current, index) {
			if (index % 2) current *= 2;
			if (current > 9) current -= 9;
			return previous + current;
		});

	return 0 === sum % 10;
}

export function isValidPhoneNumber(phoneNumber) {
	phoneNumber = phoneNumber.replace(/(?!^\+)\D/g, '');
	console.log(phoneNumber.length, phoneNumber.replace(/(^\+46)/g, '').length);
	if (phoneNumber.replace(/(^\+46)/g, '').length > 11) return false;
	return phoneNumber.replace(/(?!^\+)\D/g, '').match(PHONE_REGEX)
		? true
		: false;
}

export function isValidEmail(email) {
	return email.match(EMAIL_REGEX) ? true : false;
}
