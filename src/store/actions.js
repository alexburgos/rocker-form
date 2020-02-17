import constants from './constants';

const PHONE_REGEX = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;

// validate Swedish person id number using checksum
function isValidSSN(pinNumber) {
  pinNumber = pinNumber.replace(/\D/g, "")
    .split("") 
    .reverse()
    .slice(0, 10);

  if (pinNumber.length !== 10) {
    return false;
  }

  var sum = pinNumber
    .map((n) => Number(n))
    .reduce(function (previous, current, index) {
      if (index % 2) current *= 2;
      if (current > 9) current -= 9;
      return previous + current;
    });

  return 0 === sum % 10;
};

function isValidPhoneNumber(phoneNumber) {
  return phoneNumber.match(PHONE_REGEX);
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
