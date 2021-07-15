import React from "react";
import TableHeader from "./TableHeader";
import FeedbackTableBody from "./FeedbackTableBody";

const Table = (props) => {
  const { headers, rows } = props;
  return (
    <div>
      <table className="table table-bordered table-hover">
        <TableHeader headers={headers}></TableHeader>
        <FeedbackTableBody headers={headers} rows={rows}></FeedbackTableBody>
      </table>
    </div>
  );
};

export default Table;
