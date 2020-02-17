import constants from './constants';

const initialState = {
	validForm: false,
	errors: {},
	personNumber: '',
	phoneNumber: '',
	email: '',
	country: '',
  submitted: false,
	countries: []
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
				validForm: false,
			};
		case constants.VALID_FORM:
			return {
				...state,
				errors: {},
				validForm: action.payload
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
				country: action.payload
			};

		default:
			return state;
	}
}
