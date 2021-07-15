import React from "react";
import { Link } from "react-router-dom";

const FeedbackTableBody = (props) => {
  const { headers, rows } = props;
  const columns = headers ? headers.length : 0;
  const showSpinner = rows === null;

  function buildRow(row, headers) {
    return (
      <tr key={row.id}>
        {headers.map((value, index) => {
          if (index === 4) {
            return (
              <td>
                <Link
                  to={{
                    pathname:
                      "/dashboard/submitfeedback/writefeedback/" +
                      row.Course_Code,
                    id: row.id,
                  }}
                >
                  Link
                </Link>
              </td>
            );
          } else {
            return <td key={index}>{row[value]}</td>;
          }
        })}
      </tr>
    );
  }

  return (
    <tbody>
      {showSpinner && (
        <tr key="spinner-0">
          <td colSpan={columns} className="text-center">
            <div className="spinner-border" role="status"></div>
          </td>
        </tr>
      )}
      {!showSpinner &&
        rows &&
        rows.map((value) => {
          return buildRow(value, headers);
        })}
    </tbody>
  );
};

export default FeedbackTableBody;
