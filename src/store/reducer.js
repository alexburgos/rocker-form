import constants from './constants';

const initialState = {
	validForm: false,
	validating: false,
	personNumber: '',
	phoneNumber: '',
	email: '',
	country: '',
  submitted: false,
  selectedCountry: '',
	countries: []
};

export default function formReducer(state = initialState, action) {
	switch (action.type) {
		case constants.VALIDATE:
			return {
				...state
			};

		case constants.VALID_FORM:
			return {
				...state
			};
		case constants.FETCH_COUNTRIES:
			return {
				...state,
				countries: action.payload
			};
		case constants.LOAD_CACHED_COUNTRIES:
			return {
				...state,
				countries: action.payload
			};
		case constants.SET_COUNTRY:
			return {
				...state,
				selectedCountry: action.payload
			};

		default:
			return state;
	}
}
