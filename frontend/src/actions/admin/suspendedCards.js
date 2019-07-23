import { showErrorMessage } from '../error';
import { HOST, PORT } from '../.config';

export function selectSuspendedCard(i) {
  return { type: "SELECT_SUSPENDED_CARD", i };
}

export function sortSuspendedCards(attr) {
  return { type: "SORT_SUSPENDED_CARDS", attr };
}

export function requestConflictData() {
  return { type: "REQUEST_CONFLICT_DATA" };
}

export function receiveConflictData(json) {
  return { type: "RECEIVE_CONFLICT_DATA", json };
}

export function requestReassignment(resolution) {
  return { type: "REQUEST_REASSIGNMENT", resolution };
}

export function reassignmentSucceed() {
  return { type: "REASSIGNMENT_SUCCEED" };
}

export function fetchSuspendedCards(order) {
  return (dispatch) => {
    dispatch(requestConflictData());
    return fetch(
      `http://${HOST}:${PORT}/api/admin/suspended-cards?attr=${order ? order.attr : null}&asc=${order ? order.asc : null}`
    )
      .then(res => res.json())
      .then(json => {
        if(json.err) {
          dispatch(showErrorMessage(json.err, 0));
        } else {
          dispatch(receiveConflictData(json.results));
        }
      });
  };
}

export function resolveConflict(resolution) {
  return (dispatch) => {
    dispatch(requestReassignment(resolution));
    return fetch(`http://${HOST}:${PORT}/api/admin/resolve-conflict`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resolution)
    })
      .then(json => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(reassignmentSucceed());
        }
      });
  };
}