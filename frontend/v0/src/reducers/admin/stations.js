export default function stations(state = {}, action) {
  switch(action.type) {
    case 'SELECT_STATION': {
      return { ...state, selected: action.i };
    }   

    case 'RECEIVE_STATION_DATA': {
      return { ...state, isFresh: true };
    }
        
    case 'SORT_STATIONS': {
      return {
        ...state,
        isFresh: false,
        order: {
          attr: action.attr,
          asc: (
            state.order.attr === action.attr
              ? !state.order.asc
              : true
          )
        }
     };
    }

    case 'STATION_CREATED': {
      return { ...state, isFresh: false };
    }
        
    case 'REQUEST_STATION_CREATION':
    case 'REQUEST_FARE_UPDATE':
    case 'FARE_UPDATE_SUCCEED':
    
    default:
        return state;
  }
}