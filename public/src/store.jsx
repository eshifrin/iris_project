import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import permissionsReducer from './reducers/permissions';

// import math from "./reducers/mathReducer";
// import user from "./reducers/userReducer";

export default createStore(
    combineReducers({
      permissionsReducer,
        // user
    }),
    {},
    // applyMiddleware(logger(), thunk, promise()),
    applyMiddleware(logger, thunk, promise()),
);
