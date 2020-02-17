import constants from './constants';

const PHONE_REGEX = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;
const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const SSN_REGEX = /^(\d{2}){0,1}(\d{2})(\d{2})(\d{2})([\-|\+]{0,1})?(\d{3})(\d{0,1})$/;

function testDate (year, month, day) {
  const date = new Date(year, month, day);
  return !(+date.getFullYear().toString().slice(2) !== +year || date.getMonth() !== +month || date.getDate() !== +day);
};

// validate Swedish person id number using checksum
function isValidPersonNumber(personNumber) {
  personNumber = personNumber.replace(/\D/g, ""); // remove all non numeric characters
  const personNumberArray = personNumber.split("")
  .reverse()
  .slice(0, 10);

  const match = personNumber.match(SSN_REGEX);

  if (personNumberArray.length !== 10 || personNumberArray.length > 10 || !match) return false;

  const validDate = testDate(match[2], match[3], match[4]);

  if (!validDate) return false;

  var sum = personNumberArray
    .map((n) => Number(n))
    .reduce(function (previous, current, index) {
      if (index % 2) current *= 2;
      if (current > 9) current -= 9;
      return previous + current;
    });

  return 0 === sum % 10;
};

function isValidPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(?!^\+)\D/g, "").match(PHONE_REGEX) ? true : false;
}

function isValidEmail(email) {
  return email.match(EMAIL_REGEX) ? true : false;
}

export function fieldChange(name, value) {
  return {
    type: constants.FIELD_CHANGE,
    payload: {
      name,
      value
    }
  }
};

export function validateForm() {
  return (dispatch, state) => {
    let hasErrors = false;
    let formErrors = {};

    const formState = state();
    const fieldsToValidate = (({ phoneNumber, personNumber, email }) => ({ phoneNumber, personNumber, email }))(formState);

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
      })
    } else {
      console.log('Success!');
      // if this was a production app I would do something here to submit the form data
      return dispatch({
        type: constants.VALID_FORM,
        payload: true
      })
    }

  }
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
