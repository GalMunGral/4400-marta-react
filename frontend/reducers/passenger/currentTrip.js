export default function currentTrip(state = {}, action) {
    switch(action.type) {
        case 'START_TRIP':
            return Object.assign({}, state, {
                ...state,
                startTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                startStationIndex: action.i,
                currentFare: action.fare
            });
        case 'END_TRIP':
            return Object.assign({}, state, {
                ...state,
                endStationIndex: action.i
            });
        case 'SUBMIT_TRIP':
            return state;
        case 'SHOW_ERROR_MESSAGE':
        case 'TRIP_SUBMISSION_SUCCEED':
            const defaultState = {
                startTime: null,
                currentFare: null,
                startStationIndex: null,
                endStationIndex: null
            };
            return defaultState;
        default:
            return state;
    }
}