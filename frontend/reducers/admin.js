import { combineReducers } from 'redux';
import breezeCards from './admin/breezeCards';
import suspendedCards from './admin/suspendedCards';
import stations from './admin/stations';
import flowReport from './admin/flowReport';

export default combineReducers({
    stations,
    suspendedCards,
    breezeCards,
    flowReport
});