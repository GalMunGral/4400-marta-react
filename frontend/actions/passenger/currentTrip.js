import fetch from 'isomorphic-fetch';
import { showErrorMessage } from '../error';

export function startTrip(i, fare) {
  return { type: "START_TRIP", i, fare};
}

export function endTrip(i) {
  return { type: "END_TRIP", i };
}

export function submitTrip(trip) {
  return { type: "SUBMIT_TRIP", trip };
}

export function tripSubmissionSucceed(trip) {
  return { type: "TRIP_SUBMISSION_SUCCEED", trip };
}

export function reset() {
  return { type: 'RESET' };
}

export function completeTrip(trip) {
  return (dispatch) => {
    dispatch(submitTrip(trip));
    return fetch('/api/passenger/complete-trip', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    })
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(tripSubmissionSucceed(trip));
        }
      });
  };
}
