export default function cards(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_MY_CARD_DATA': {
      return { ...state, isLoading: true };
    }
        
    case 'RECEIVE_MY_CARD_DATA': {
      return {
        ...state,
        isLoading: false,
        isFresh: true,
        selected: 0,
        data: action.json
      };
    }
        
    case 'SORT_MY_CARDS': {
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
        
    case 'SELECT_MY_CARD': {
      return { ...state, selected: action.i };
    }

    case 'RECEIVE_NEW_CARD': {
      return { ...state, isFresh: false };
    }
        
    case 'MY_VALUE_UPDATE_SUCCEED': {
      return { ...state, isFresh: false };
    }
        
    case "TRIP_SUBMISSION_SUCCEED": {
      return { ...state, isFresh: false };
    }
        
    case "CARD_REMOVED": {
      return { ...state, isFresh: false };
    }

    case 'REQUEST_NEW_CARD':
    case 'REQUEST_MY_VALUE_UPDATE':
 
    default: return state;
  }
}