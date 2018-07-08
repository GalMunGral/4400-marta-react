export default function currentTrip(state = {}, action) {
  switch(action.type) {
    case 'START_TRIP': {
      const startTime = (
        new Date().toISOString().slice(0, 19).replace('T', ' ')
      );
      return {
        ...state,
        startTime,
        startStationIndex: action.i,
        currentFare: action.fare
      };
    }
      
    case 'END_TRIP': {
      return { ...state, endStationIndex: action.i };
    }

    case 'SHOW_ERROR_MESSAGE':
    case 'TRIP_SUBMISSION_SUCCEED': {
      const defaultState = {
        startTime: null,
        currentFare: null,
        startStationIndex: null,
        endStationIndex: null
      };
      return defaultState;
    }
    
    case 'SUBMIT_TRIP':
    default: return state;
  }
}