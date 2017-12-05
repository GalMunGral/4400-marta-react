export default function currentUser(state = {}, action) {
    switch(action.type) {
        case 'REQUEST_LOGIN':
            return Object.assign({}, state, {
                ...state,
                username: action.username
            });
        case 'ACCESS_GRANTED':
            return Object.assign({}, state, {
                ...state,
                isLoggedIn: true,
                userType: action.userType
            });
        case 'ACCESS_DENIED':
            return state;
        case 'SUBMIT_USER_PROFILE':
            return state;
        case 'NEW_USER_CREATED':
            return Object.assign({}, state, {
                ...state,
                isLoggedIn: true,
                username: action.userInfo.username,
                userType: 'PASSENGER'
            });
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}