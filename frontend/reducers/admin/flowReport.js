export default function stations(state = {}, action) {
    switch(action.type) {
        case 'REQUEST_REPORT_DATA':
            return Object.assign({}, state, {
                ...state,
                isLoading: true
            });
        case 'RECEIVE_REPORT_DATA':
            return Object.assign({}, state, {
                isLoading: false,
                isFresh: true,
                data: action.json
            });
        case 'SELECT_REPORT':
            return Object.assign({}, state, {
                ...state,
                selected: action.i
            });
        case 'SORT_REPORT_ENTRIES':
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
        case 'UPDATE_REPORT_FILTER':
            return Object.assign({}, state, {
                ...state,
                isFresh: false,
                filter: action.filter
            });
        default:
            return state;
    }
}