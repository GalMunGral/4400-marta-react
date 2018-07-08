import fetch from 'isomorphic-fetch';
import { showErrorMessage, closeErrorMessage } from '../error';

export function selectReport(i) {
  return { type: "SELECT_REPORT", i };
}

export function sortReportEntries(attr) {
  return { type: "SORT_REPORT_ENTRIES", attr };
}

export function requestReportData() {
  return { type: "REQUEST_REPORT_DATA" };
}

export function receiveReportData(json) {
  return { type: "RECEIVE_REPORT_DATA", json };
}

export function updateReportFilter(filter) {
  return { type: "UPDATE_REPORT_FILTER", filter };
}

export function fetchReport(filter, order) {
  return (dispatch) => {
    dispatch(requestReportData());
    const start = filter ? filter.startTime : null;
    const end = filter ? filter.endTime : null;
    const attr = order ? order.attr : null;
    const asc = order ? order.asc : null;
    return fetch(
      `http://localhost:8080/api/admin/flow-report?start=${start}&end=${end}&attr=${attr}&asc=${asc}`
    )
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 0));
        } else {
          dispatch(closeErrorMessage());
        }
        dispatch(receiveReportData(json.results));
      });
  };
}
