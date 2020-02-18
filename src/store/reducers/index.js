import constants from '../constants/index';

const fieldsFromCache = JSON.parse(localStorage.getItem('formState'));
const cachedCountries = JSON.parse(localStorage.getItem('countries'));

const initialState = {
	validForm: false,
	errors: {},
	personNumber: fieldsFromCache ? fieldsFromCache.personNumber : '',
	phoneNumber: fieldsFromCache ? fieldsFromCache.phoneNumber : '',
	email: fieldsFromCache ? fieldsFromCache.email : '',
	country: fieldsFromCache ? fieldsFromCache.country : '',
	submitted: false,
	countries: cachedCountries ? cachedCountries : []
};

export default function formReducer(state = initialState, action) {
	switch (action.type) {
		case constants.FIELD_CHANGE:
			return {
				...state,
				[action.payload.name]: action.payload.value
			};

		case constants.FORM_ERROR:
			return {
				...state,
				errors: action.payload,
				validForm: false
			};
		case constants.VALID_FORM:
			return {
				...state,
				errors: {},
				validForm: action.payload,
				submitted: action.payload
			};
		case constants.FETCH_COUNTRIES:
			return {
				...state,
				countries: action.payload
			};
		case constants.SET_COUNTRY:
			return {
				...state,
				country: action.payload
			};

		default:
			return state;
	}
}
