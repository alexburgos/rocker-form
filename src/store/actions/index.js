import constants from '../constants/index';
import {
	isValidEmail,
	isValidPersonNumber,
	isValidPhoneNumber
} from '../../utils/validators';

/* Actions */
export function fieldChange(name, value) {
	return {
		type: constants.FIELD_CHANGE,
		payload: {
			name,
			value
		}
	};
}

export function validateForm() {
	return (dispatch, state) => {
		let hasErrors = false;
		let formErrors = {};

		const formState = state();
		const fieldsToValidate = (({ phoneNumber, personNumber, email }) => ({
			phoneNumber,
			personNumber,
			email
		}))(formState);

		if (formState.country.length === 0) {
			hasErrors = true;
			formErrors.country = 'Please select a country.';
		}

		for (let [key, value] of Object.entries(fieldsToValidate)) {
			if (key === 'email') {
				if (value.length === 0) {
					hasErrors = true;
					formErrors.email = 'Email field cannot be empty.';
				} else if (!isValidEmail(value)) {
					hasErrors = true;
					formErrors.email = 'Invalid Email.';
				}
			} else if (key === 'phoneNumber') {
				if (value.length === 0) {
					hasErrors = true;
					formErrors.phoneNumber = 'Phone number field cannot be empty.';
				} else if (!isValidPhoneNumber(value)) {
					hasErrors = true;
					formErrors.phoneNumber = 'Invalid Swedish Phone Number.';
				}
			} else if (key === 'personNumber') {
				if (value.length === 0) {
					hasErrors = true;
					formErrors.personNumber = 'Person number field cannot be empty.';
				} else if (!isValidPersonNumber(value)) {
					hasErrors = true;
					formErrors.personNumber = 'Invalid Person Number.';
				}
			}
		}

		if (hasErrors) {
			return dispatch({
				type: constants.FORM_ERROR,
				payload: formErrors
			});
		} else {
			console.log('Success!');
			// clear out local storage
			localStorage.removeItem('formState');
			// if this was a production app I would do something here to submit the form data
			return dispatch({
				type: constants.VALID_FORM,
				payload: true
			});
		}
	};
}

export function cacheFormState() {
	return (dispatch, state) => {
		const formState = state();
		const fieldsToCache = (({ phoneNumber, personNumber, email, country }) => ({
			phoneNumber,
			personNumber,
			email,
			country
		}))(formState);

		localStorage.setItem('formState', JSON.stringify(fieldsToCache));

		return dispatch({
			type: constants.CACHE_FORM,
			payload: ''
		});
	};
}

export function fetchCountries() {
	return async dispatch => {
		let response = await fetch('https://restcountries.eu/rest/v2/all');
		let countries = await response.json();

		localStorage.setItem('countries', JSON.stringify(countries));

		return dispatch({
			type: constants.FETCH_COUNTRIES,
			payload: countries
		});
	};
}

export function setCountry(country) {
	return {
		type: constants.SET_COUNTRY,
		payload: country
	};
}
