import React from "react";
import useGetColumnsRows from "./useGetColumnsRows";

function Table() {
  const [columns, rows] = useGetColumnsRows();
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
