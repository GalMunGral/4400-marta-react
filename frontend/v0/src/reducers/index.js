import { combineReducers } from 'redux';
import currentUser from './currentUser';
import passenger from './passenger';
import admin from './admin';
import stations from './stations';
import error from './error';

export default combineReducers({
  currentUser,
  stations,
  admin,
  passenger,
  error
});
