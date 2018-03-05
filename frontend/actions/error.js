export function showErrorMessage(msg, lvl) {
  return { type: "SHOW_ERROR_MESSAGE", msg, lvl };
}

export function closeErrorMessage() {
  return { type: "CLOSE_ERROR_MESSAGE" };
}

