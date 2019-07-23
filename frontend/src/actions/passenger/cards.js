import { showErrorMessage } from '../error';
import { HOST, PORT } from '../.config';

export function selectMyCard(i) {
  return { type: "SELECT_MY_CARD", i };
}

export function sortMyCards(attr) {
  return { type: "SORT_MY_CARDS", attr };
}

export function requestMyCardData() {
  return { type: "REQUEST_MY_CARD_DATA" };
}

export function requestMyValueUpdate(cardInfo) {
  return { type: "REQUEST_MY_VALUE_UPDATE", cardInfo };
}

export function myValueUpdateSucceed() {
  return { type: "MY_VALUE_UPDATE_SUCCEED" };
}

export function requestNewCard(cardInfo) {
  return { type: "REQUEST_NEW_CARD", cardInfo };
}

export function receiveNewCard(cardInfo) {
  return { type: "RECEIVE_NEW_CARD" };
}

export function receiveMyCardData(json) {
  return { type: "RECEIVE_MY_CARD_DATA", json };
}

export function requestCardRemoval(cardInfo) {
  return { type: "REQUEST_CARD_REMOVAL", cardInfo };
}

export function cardRemoved(cardInfo) {
  return { type: "CARD_REMOVED", cardInfo };
}

export function removeCard(cardInfo) {
  return (dispatch) => {
    dispatch(requestCardRemoval(cardInfo));
    return fetch(`http://${HOST}:${PORT}/api/passenger/remove-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardInfo)
    })
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(cardRemoved(cardInfo));
        }
      });
  };
}

export function fetchMyCards(user, order) {
  return (dispatch) => {
    dispatch(requestMyCardData());
    const attr = order ? order.attr : "";
    const asc = order ? order.asc : "";
    return fetch(
      `http://${HOST}:${PORT}/api/passenger/my-cards?user=${user}&attr=${attr}&asc=${asc}`
    )
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 0));
        } else {
          dispatch(receiveMyCardData(json.results));
        }
      });
  };
}

export function addValueToCard(cardInfo) {
  return (dispatch) => {
    dispatch(requestMyValueUpdate(cardInfo));
    fetch(`http://${HOST}:${PORT}/api/passenger/add-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardInfo)
    })
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(myValueUpdateSucceed());
        }
      });
  };
}

export function addNewCard(cardInfo) {
  return (dispatch) => {
    dispatch(requestNewCard(cardInfo));
    fetch(`http://${HOST}:${PORT}/api/passenger/new-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardInfo)
    })
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err, 1));
        } else {
          dispatch(receiveNewCard(cardInfo));
        }
      });
  };
}