import { combineReducers, legacy_createStore } from 'redux';
import { userReducer } from './reduces/user.reducer';

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;

const rootReducer = combineReducers({
  userModule: userReducer,
});

export const store = legacy_createStore(rootReducer, middleware);
