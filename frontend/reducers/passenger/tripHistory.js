export default function tripHistory(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_TRIP_HISTORY': {
      return { ...state, isLoading: true };
    }
        
    case 'RECEIVE_TRIP_HISTORY': {
      return {
        ...state,
        isLoading: false,
        isFresh: true,
        data: action.json
      };
    }
        
    case 'SORT_HISTORY_ENTRIES': {
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
        
    case 'SELECT_HISTORY_ENTRY': {
      return { ...state, selected: action.i };
    }
        
    case 'UPDATE_HISTORY_FILTER': {
      return {
        ...state,
        isFresh: false,
        filter: action.filter
      };
    }
        
    case 'TRIP_SUBMISSION_SUCCEED': {
      return { ...state, isFresh: false };
    }
        
    default: return state;
  }
}