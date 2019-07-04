import React, { Component } from "react";
import TableHead from "./Thead/thead";
import TableBody from "./tablebody/tableBody";

class Table extends Component {
  state = {};

  render() {
    const { headerNames, data, onDelete, redirectTo } = this.props;
    return (
      <table className="table mt-4">
        <TableHead headerNames={headerNames} />
        <TableBody onDelete={onDelete} data={data} redirectTo={redirectTo} />
      </table>
    );
  }
}

export default Table;
