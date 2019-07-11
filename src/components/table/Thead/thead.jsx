import React from "react";

const TableHead = ({ headerNames, orderBy }) => {
  return (
    <thead>
      <tr>
        {headerNames.map(header => (
          <th
            key={header.label || header.key}
            onClick={() => orderBy(header.path)}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
