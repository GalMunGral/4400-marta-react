export default function currentUser(state = {}, action) {
  switch(action.type) {

    case 'REQUEST_LOGIN': {
      return {
        ...state,
        username: action.username
      };
    }
      
    case 'ACCESS_GRANTED': {
      return {
        ...state,
        isLoggedIn: true,
        userType: action.userType
      };
    }
      
    
    case 'NEW_USER_CREATED': {
      return {
        ...state,
        isLoggedIn: true,
        username: action.userInfo.username,
        userType: 'PASSENGER'
      };
    }
    
    case 'ACCESS_DENIED': return state;

    case 'SUBMIT_USER_PROFILE': return state;

    case 'LOGOUT': return {};

    default: return state;
  }
}