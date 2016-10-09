import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import questionsReducer from './reducers/questionsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // //eslint-disable-line no-underscore-dangle

export default function (initialState = {}) {
  const rootReducer = combineReducers({
    questions: questionsReducer
  });

  return createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
  ));
}
