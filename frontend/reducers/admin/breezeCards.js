export default function breezeCards(state = {}, action) {
    switch(action.type) {
        case 'REQUEST_CARD_DATA':
            return Object.assign({}, state, {
                ...state,
                isLoading: true
            });
        case 'RECEIVE_CARD_DATA':
            return Object.assign({}, state, {
                ...state,
                isLoading: false,
                isFresh: true,
                data: action.json
            });
        case 'SELECT_CARD':
            return Object.assign({}, state, {
                ...state,
                selected: action.i
            });
        case 'SORT_CARDS':
            return Object.assign({}, state, {
                ...state,
                isFresh: false,
                order: {
                    attr: action.attr,
                    asc: (action.attr === state.order.attr)
                        ? !state.order.asc
                        : true
                }
            });
        case 'UPDATE_CARD_FILTER':
            return Object.assign({}, state, {
                ...state,
                isFresh: false,
                filter: action.filter
            });
        case 'REQUEST_VALUE_UPDATE':
            return state;
        case 'VALUE_UPDATE_SUCCEED':
            return Object.assign({}, state, {
                ...state,
                isFresh: false
            });
        case 'REQUEST_OWNER_UPDATE':
            return state;
        case 'OWNER_UPDATE_SUCCEED':
            return Object.assign({}, state, {
                ...state,
                isFresh: false
            });
        default:
            return state;
    }
}