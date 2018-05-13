export default function breezeCards(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_CARD_DATA': {
      return { ...state, isLoading: true };
    }
        
    case 'RECEIVE_CARD_DATA': {
      return {
        ...state,
        isLoading: false,
        isFresh: true,
        data: action.json
      };
    }
        
    case 'SELECT_CARD': {
      return { ...state, selected: action.i };
    }
        
    case 'SORT_CARDS': {
      return {
        ...state,
        isFresh: false,
        order: {
          attr: action.attr,
          asc: (
            action.attr === state.order.attr
              ? !state.order.asc
              : true
          )
        }
      };
    }
        
    case 'UPDATE_CARD_FILTER': {
      return {
        ...state,
        isFresh: false,
        filter: action.filter
      };
    }    
    
    case 'VALUE_UPDATE_SUCCEED': {
      return { ...state, isFresh: false };
    }
        
    
    case 'OWNER_UPDATE_SUCCEED': {
      return { ...state, isFresh: false };
    }
        

    case 'REQUEST_VALUE_UPDATE':
    case 'REQUEST_OWNER_UPDATE':
    
    default:
        return state;
  }
}