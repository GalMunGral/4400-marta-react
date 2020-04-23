import React, { useState, useEffect } from "react";

const Table = ({
  columns,
  data,
  keyFn,
  selected,
  selectFn = () => {},
  actionEnabled = false,
  actionName,
  actionFn = () => {},
}) => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    setMyData(data);
  }, [data]);

  const ActionButton = (item) =>
    actionEnabled ? (
      <td className="has-text-centered">
        <button
          className="button is-danger is-small is-light"
          onClick={() => actionFn(item)}
        >
          {actionName}
        </button>
      </td>
    ) : null;

  return (
    <table className="table is-fullwidth is-striped">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={i}
              onClick={() => {
                setMyData(
                  [...myData].sort((a, b) => {
                    if (!Number.isNaN(a[col.name] - b[col.name])) {
                      return b[col.name] - a[col.name];
                    }
                    return a[col.name] > b[col.name] ? -1 : 1;
                  })
                );
              }}
            >
              {col.displayName}
            </th>
          ))}
          {actionEnabled ? <th></th> : null}
        </tr>
      </thead>
      <tbody>
        {myData.map((item) => (
          <tr
            className={item === selected ? "selected" : ""}
            key={keyFn(item)}
            onClick={() => selectFn(item)}
          >
            {columns.map((col, i) => (
              <td key={i}>{String(item[col.name]).slice(0, 16)}</td>
            ))}
            {actionEnabled ? <ActionButton item={item} /> : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
