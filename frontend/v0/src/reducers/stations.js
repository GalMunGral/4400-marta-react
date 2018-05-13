export default function stations(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_STATION_DATA': {
      return { ...state, isLoading: true };
    }

    case 'RECEIVE_STATION_DATA': {
      const rawData = action.json;
      const data = rawData.map(station => ({
        ...station,
        EnterFare: Number(station.EnterFare).toFixed(2),
        ClosedStatus: station.ClosedStatus ? 'Closed' : 'Open'
      }));

      return { ...state, isLoading: false, data };
    }

    default: {
      return state;
    }
  }
}