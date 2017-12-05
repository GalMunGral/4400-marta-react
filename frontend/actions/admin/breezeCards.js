import { showErrorMessage, closeErrorMessage } from '../error';

export function selectCard(i) {
    return { type: "SELECT_CARD", i };
}

export function sortCards(attr) {
    return { type: "SORT_CARDS", attr };
}

export function requestValueUpdate(cardInfo) {
    return { type: "REQUEST_VALUE_UPDATE", cardInfo };
}

export function valueUpdateSucceed() {
    return { type: "VALUE_UPDATE_SUCCEED" };
}

export function requestOwnerUpdate(cardInfo) {
    return { type: "REQUEST_OWNER_UPDATE", cardInfo};
}

export function ownerUpdateSucceed() {
    return { type: "OWNER_UPDATE_SUCCEED" };
}

export function requestCardData() {
    return { type: "REQUEST_CARD_DATA" };
}

export function receiveCardData(json) {
    return { type: "RECEIVE_CARD_DATA", json };
}

export function updateFilter(filter) {
    return { type: "UPDATE_CARD_FILTER", filter };
}

export function fetchCards(filter, order) {
    return (dispatch) => {
        dispatch(requestCardData());
        const owner = filter ? filter.owner : "";
        const cardNumber = filter ? filter.cardNumber : "";
        const minValue = filter ? filter.minValue : "";
        const maxValue = filter ? filter.maxValue : "";
        const showSuspended = filter ? filter.showSuspended : "";
        const attr = order ? order.attr : "";
        const asc = order ? order.asc : "";
        return fetch(`/api/admin/breeze-cards?
            owner=${owner}
            &cardNumber=${cardNumber}
            &minValue=${minValue}
            &maxValue=${maxValue}
            &showSuspended=${showSuspended}
            &attr=${attr}
            &asc=${asc}`.replace(/\s/g, ''))
            .then(response => response.json())
            .then(json => {
                if (json.err) {
                    dispatch(showErrorMessage(json.err, 0));
                } else {
                    dispatch(closeErrorMessage());
                    dispatch(receiveCardData(json.results));
                }
            });
    };
}

export function updateCardValue(cardInfo) {
    return (dispatch) => {
        dispatch(requestValueUpdate(cardInfo));
        fetch('/api/admin/update-card-value', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cardInfo)
        })
        .then(res => res.json())
        .then(json => {
            if (json.err) {
                dispatch(showErrorMessage(json.err, 1));
            } else {
                dispatch(valueUpdateSucceed());
            }
        });
    };
}

export function updateCardOwner(cardInfo) {
    return (dispatch) => {
        dispatch(requestOwnerUpdate(cardInfo));
        fetch('/api/admin/update-card-owner', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cardInfo)
        })
        .then(res => res.json())
        .then(json => {
            if (json.err) {
                dispatch(showErrorMessage(json.err, 1));
            } else {
                dispatch(closeErrorMessage());
                dispatch(ownerUpdateSucceed());
            }
        });
    };
}