import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" style={{ margin: "0 auto",width: "50%" }}>
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              onSort={onSort}
            />
            <TableBody data={data} columns={columns} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
