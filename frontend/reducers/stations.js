export default function stations(state = {}, action) {
    switch(action.type) {
        case 'REQUEST_STATION_DATA':
            return Object.assign({}, state, {
                ...state,
                isLoading: true
            });
        case 'RECEIVE_STATION_DATA':
            return Object.assign({}, state, {
                isLoading: false,
                data: action.json.map((station) => (
                    Object.assign({}, station, {
                        EnterFare: parseFloat(station.EnterFare).toFixed(2),
                        ClosedStatus: station.ClosedStatus ? 'Closed' : 'Open'
                    })
                ))
            });
        default:
            return state;
    }
}