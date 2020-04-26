import React from "react";

const itemPrototype = (text) => (
  <div className="panel-block is-active">
    <span className="panel-icon">
      <i className="fas fa-book" aria-hidden="true"></i>
    </span>
    {text}
  </div>
);

const Panel = ({ title, children }) => (
  <nav className="panel">
    <div className="panel-heading is-marginless has-text-centered title is-1">
      {title}
    </div>
    {React.Children.map(children, (el) => {
      const proto = itemPrototype(el.props.children);
      return React.cloneElement(el, proto.props, proto.props.children);
    })}
  </nav>
);

export default Panel;
