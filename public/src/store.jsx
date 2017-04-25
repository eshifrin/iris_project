import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import permissionsAndPostsReducer from './reducers/permissions';


export default createStore(
    combineReducers({
      main: permissionsAndPostsReducer,
    }),
    {},
    applyMiddleware(logger, thunk, promise()),
);
