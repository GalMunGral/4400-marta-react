export default function stations(state = {}, action) {
    switch(action.type) {
        case 'SELECT_STATION':
            return Object.assign({}, state, {
                ...state,
                selected: action.i
            });

        case 'RECEIVE_STATION_DATA':
            return Object.assign({}, state, {
                ...state,
                isFresh: true
            });
        case 'SORT_STATIONS':
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
        case 'REQUEST_STATION_CREATION':
            return state;
        case 'STATION_CREATED':
            return Object.assign({}, state, {
                isFresh: false
            });
        case 'REQUEST_FARE_UPDATE':
            return state;
        case 'FARE_UPDATE_SUCCEED':
            return state;
        default:
            return state;
    }
}