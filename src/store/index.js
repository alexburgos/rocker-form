import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import formReducer from './reducer';

const logger = createLogger({
  collapsed: true
});

export default createStore(
  formReducer,
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk, logger)) : applyMiddleware(thunk)
);
