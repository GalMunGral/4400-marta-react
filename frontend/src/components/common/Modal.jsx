import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ mount, closeFn, children }) =>
  createPortal(
    <div className="modal is-active">
      <div className="modal-background" onClick={closeFn}></div>
      <div className="modal-content box">{children}</div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeFn}
      >
        Close
      </button>
    </div>,
    document.querySelector(mount)
  );

export default Modal;
