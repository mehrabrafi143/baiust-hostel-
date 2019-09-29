import React from "react";
import _ from "lodash";
import { getUserRole } from "../../../service/authService/authService";

const TableBody = ({ data, headerNames }) => {
  const role = getUserRole();

  const isFloat = n => {
    return Number(n) === n && n % 1 !== 0;
  };

  const renderData = (item, hN) => {
    if (hN.content) return hN.content(item);

    const element = _.get(item, hN.path);

    if (isFloat(element)) return element.toFixed(2);

    return element || "N/A";
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
