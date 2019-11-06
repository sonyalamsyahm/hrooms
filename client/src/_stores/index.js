import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import rooms from '../_reducers/room';
import customers from '../_reducers/customer';
import users from '../_reducers/setting';
import checkins from '../_reducers/checkin';

//global state
const rootReducer = combineReducers({
  rooms,
  customers,
  users,
  checkins,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
