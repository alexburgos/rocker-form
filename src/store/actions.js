import constants from './constants';

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

export function loadCachecCountries(countries) {
	return {
		type: constants.LOAD_CACHED_COUNTRIES,
		payload: countries
	};
}

export function setCountry(country) {
	return {
		type: constants.SET_COUNTRY,
		payload: country
	};
}
