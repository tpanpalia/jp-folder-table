import React from "react";
import getRowsColumns from "./util";

function Table() {
  const [columns, rows] = getRowsColumns();
  return (
    <div>
      <table>
        <tr>
          {columns &&
            columns.map((x) => {
              return <th>{x}</th>;
            })}
        </tr>
        {rows.map((val) => {
          return (
            <tr>
              {columns.map((key) => {
                return <td key={key}>{val[key]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Table;
