import { showErrorMessage, closeErrorMessage } from '../error';
import { BASE_URL } from '../.config';

export function selectHistoryEntry(i) {
  return { type: "SELECT_HISTORY_ENTRY", i };
}

export function sortHistoryEntries(attr) {
  return { type: "SORT_HISTORY_ENTRIES", attr };
}

export function requestTripHistory() {
  return { type: "REQUEST_TRIP_HISTORY" };
}

export function receiveTripHistory(json) {
  return { type: "RECEIVE_TRIP_HISTORY", json };
}

export function updateHistoryFilter(filter) {
  return { type: "UPDATE_HISTORY_FILTER", filter };
}

export function fetchTripHistory(username, filter, order) {
  return (dispatch) => {
    dispatch(requestTripHistory());
    const start = filter ? filter.start : "";
    const end = filter ? filter.end : "";
    const user = username ? username : "";
    const attr = order ? order.attr : "";
    const asc = order ? order.asc : "";
    return fetch(
      `http://${BASE_URL}/api/passenger/trip-history?username=${user}&start=${start}&end=${end}&attr=${attr}&asc=${asc}`
    )
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 0));
        } else {
          dispatch(closeErrorMessage());
          dispatch(receiveTripHistory(json.results));
        }
      });
  };
}