import React from "react";
import { formatContent } from "../../utilities";

export const Format = () => null;

export const Text = ({ children }) => {
  const formatted = children.map((child) => {
    if (child.type === Format) {
      const content = child.props.children;
      const format = child.props.type;
      return formatContent(content, format);
    }
    return child;
  });

  return (
    <p className="has-text-primary is-italic has-text-weight-bold">
      {formatted.join(" ")}
    </p>
  );
};

export default Text;
