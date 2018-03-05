import { showErrorMessage } from "./error";

export function requestLogin(username) {
  return { type: "REQUEST_LOGIN", username };
}

export function accessGranted(userType) {
  return { type: "ACCESS_GRANTED", userType };
}

export function accessDenied() {
  return { type: "ACCESS_DENIED" };
}

export function logout() {
  return { type: "LOGOUT" };
}

export function submitUserProfile(userInfo) {
  return { type: "SUBMIT_USER_PROFILE", userInfo };
}

export function newUserCreated(userInfo) {
  return { type: "NEW_USER_CREATED", userInfo };
}

export function newUserNotCreated(userInfo) {
  return { type: "NEW_USER_NOT_CREATED", userInfo };
}

export function login(credentials) {
  return (dispatch) => {
    dispatch(requestLogin(credentials.username));
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(accessGranted(json.userType));
        } else {
          dispatch(showErrorMessage('Incorrrect credentials! Time: ' + new Date(), 1));
          dispatch(accessDenied());
        }
      });
  };
}

export function register(userInfo) {
  return (dispatch) => {
    dispatch(submitUserProfile(userInfo));
    return fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then((json) => {
        if (json.err) {
          dispatch(showErrorMessage(json.err + " Time: " + new Date(), 1));
        }
        if (json.success) {
          dispatch(newUserCreated(userInfo));
        } else {
          dispatch(newUserNotCreated(userInfo));
        }
      });
  };
}

