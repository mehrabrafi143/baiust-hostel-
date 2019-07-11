import React from "react";
import _ from "lodash";

const TableBody = ({ data, headerNames }) => {
  const renderData = (item, hN) => {
    if (hN.content) return hN.content(item);

    return _.get(item, hN.path) || "N/A";
  };
  return (
    <tbody>
      {data.map(item => (
        <tr key={item.id}>
          {headerNames.map(hN => (
            <td key={hN.label || hN.key}> {renderData(item, hN)} </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
