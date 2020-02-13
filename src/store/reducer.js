import constants from './constants';

const initialState = {
  validForm: false,
  validating: false,
  personNumber: '',
  phoneNumber: '',
  email: '',
  country: '',
  submitted: false,
}

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


    default:
      return state;
  }
}
