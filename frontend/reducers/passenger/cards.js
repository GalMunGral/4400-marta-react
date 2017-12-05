export default function cards(state = {}, action) {
    switch(action.type) {
        case 'REQUEST_MY_CARD_DATA':
            return Object.assign({}, state, {
                ...state,
                isLoading: true
            });
        case 'RECEIVE_MY_CARD_DATA':
            return Object.assign({}, state, {
                isLoading: false,
                isFresh: true,
                selected: 0,
                data: action.json
            });
        case 'SORT_MY_CARDS':
            return Object.assign({}, state, {
                ...state,
                isFresh: false,
                order: {
                    attr: action.attr,
                    asc: state.order.attr === action.attr
                        ? !state.order.asc
                        : true
                }
            });
        case 'SELECT_MY_CARD':
            return Object.assign({}, state, {
                ...state,
                selected: action.i
            });
        case 'REQUEST_NEW_CARD':
            return state;
        case 'RECEIVE_NEW_CARD':
            return Object.assign({}, state, {
                isFresh: false,
            });
        case 'REQUEST_MY_VALUE_UPDATE':
            return state;
        case 'MY_VALUE_UPDATE_SUCCEED':
            return Object.assign({}, state, {
                isFresh: false,
            });
        case "TRIP_SUBMISSION_SUCCEED":
            return Object.assign({}, state, {
                isFresh: false,
            });
        case "CARD_REMOVED":
            return Object.assign({}, state, {
                isFresh: false,
            });
        default:
            return state;
    }
}