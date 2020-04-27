import React from "react";

const Form = ({ children, onSubmit, onReset }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}
    onReset={(e) => {
      e.preventDefault();
      onReset(e);
    }}
  >
    {children}
  </form>
);

export default Form;
