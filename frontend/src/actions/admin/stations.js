import fetch from 'isomorphic-fetch';
import { showErrorMessage } from '../error';
import { HOST, PORT } from '../.config';

export function selectStation(i) {
  return { type: "SELECT_STATION", i };
}

export function sortStations(attr) {
  return { type: "SORT_STATIONS", attr };
}

export function requestFareUpdate() {
  return { type: "REQUEST_FARE_UPDATE" };
}

export function fareUpdateSucceed() {
  return { type: "FARE_UPDATE_SUCCEED" };
}

export function requestStationCreation(stationInfo) {
  return { type: "REQUEST_STATION_CREATION", stationInfo };
}

export function stationCreated(stationInfo) {
  return { type: "STATION_CREATED", stationInfo };
}

export function updateFare(stationInfo) {
  return (dispatch) => {
    dispatch(requestFareUpdate());
    fetch(`http://${HOST}:${PORT}/api/admin/update-fare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stationInfo)
    })
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(fareUpdateSucceed());
        }
      });
  };
}

export function createStation(stationInfo) {
  return (dispatch) => {
    dispatch(requestStationCreation(stationInfo));
    fetch(`http://${HOST}:${PORT}/api/admin/create-station`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(stationInfo)
    })
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(stationCreated(stationInfo));
        }
      });
  };
}