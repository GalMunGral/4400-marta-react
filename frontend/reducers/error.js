export default function error(state = {}, action) {
  switch(action.type) {
    case "SHOW_ERROR_MESSAGE": {
      if (action.msg === state.message) return state;
      return {
          unread: true,
          level: action.lvl,
          message: action.msg
      };
    }

    case "CLOSE_ERROR_MESSAGE": {
      return { ...state, unread: false };
    }
        
    default: {
      return state;
    }
  }
}