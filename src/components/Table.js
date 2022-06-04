import React from "react";

export default function Table({ headers, rows = [] }) {
  return (
    <table className="table">
      {headers ? (
        <thead>
          <tr>
            {headers.map((x) => (
              <th key={x}>{x}</th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((x, colIndex) => (
              <td key={`${rowIndex}_${colIndex}`}>{x}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
