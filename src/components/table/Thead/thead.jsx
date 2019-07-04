import React, { Component } from "react";

const TableHead = ({ headerNames }) => {
  return (
    <thead>
      <tr>
        {headerNames.map(header => (
          <th key={header.label}> {header.label} </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
