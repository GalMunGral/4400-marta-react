export default function suspendedCards(state = {}, action) {
  switch(action.type) {
    case 'SELECT_SUSPENDED_CARD': {
      return { ...state, selected: action.i };
    }
        
    case 'SORT_SUSPENDED_CARDS': {
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
        },
      };
    }
        
    case 'REQUEST_CONFLICT_DATA': {
      return { ...state, isLoading: true };
    }
        
    case 'RECEIVE_CONFLICT_DATA': {
      return {
        ...state,
        isLoading: false,
        isFresh: true,
        data: action.json
      };
    }
        
    case 'REQUEST_REASSIGNMENT': {
      return { ...state, isFresh: false };
    }
        
    case 'REASSIGNMENT_SUCCEED': return state;
    
    default: return state;
  }
}