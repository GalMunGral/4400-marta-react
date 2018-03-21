import { combineReducers } from 'redux';
import cards from './passenger/cards';
import currentTrip from './passenger/currentTrip';
import tripHistory from './passenger/tripHistory';

export default combineReducers({
  cards,
  currentTrip,
  tripHistory
});