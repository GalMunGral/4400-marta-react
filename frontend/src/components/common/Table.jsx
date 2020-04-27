import React, { useState, useEffect, useMemo } from "react";
import { formatContent } from "../../utilities";

export const Column = ({ keyName, children: name }) => (
  <React.Fragment keyName={keyName} name={name} />
);

export const Table = ({
  data,
  keyFn,
  selected,
  selectFn = Function(),
  actionEnabled = false,
  actionName,
  actionFn = Function(),
  children,
}) => {
  const columns = useMemo(
    () =>
      React.Children.map(children, (column) => ({
        key: column.props.keyName,
        name: column.props.children,
        format: column.props.format,
      })),
    []
  );
  const [myData, setMyData] = useState([]);
  const [order, setOrder] = useState([null, true]);

  useEffect(() => {
    setMyData(data);
  }, [data]);

  function reorderBy(column) {
    let ascending = true;
    if (column === order.column) {
      ascending = !order.ascending;
    }

    const sorted = [...myData].sort((a, b) => {
      let aVal = a[column.key];
      let bVal = b[column.key];
      if (!isNaN(aVal) && !isNaN(bVal)) {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      return ascending ? (aVal < bVal ? 1 : -1) : aVal > bVal ? 1 : -1;
    });

    setMyData(sorted);
    setOrder({ column, ascending });
  }

  const tableHead = (
    <thead>
      <tr>
        {columns.map((columm, i) => (
          <th key={i} onClick={() => reorderBy(columm)}>
            {columm.name}
          </th>
        ))}
        {actionEnabled ? <th /> : null}
      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      {myData.map((item, i) => (
        <tr
          className={item === selected ? "selected" : ""}
          key={keyFn(item, i)}
          onClick={() => selectFn(item)}
        >
          {/* Data Cells */}
          {columns.map((col, i) => (
            <td key={i}>{formatContent(item[col.key], col.format)}</td>
          ))}

          {/* Action Button */}
          {actionEnabled ? (
            <td className="has-text-centered">
              <button
                className="button is-danger is-small is-light"
                onClick={() => actionFn(item)}
              >
                {actionName}
              </button>
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table className="table is-fullwidth is-striped">
      {tableHead}
      {tableBody}
    </table>
  );
};

export default Table;
