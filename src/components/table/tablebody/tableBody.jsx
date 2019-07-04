import React from "react";

const TableBody = ({ data, onDelete, redirectTo }) => {
  return (
    <tbody>
      {data.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.pricePerKg || "N/A"}</td>
          <td>{item.peoplePerKg || "N/A"}</td>
          <td>{item.pricePerHead || "N/A"}</td>
          <td>
            <span className="btn btn-danger" onClick={() => onDelete(item)}>
              Delete
            </span>
          </td>
          <td>
            <span className="btn btn-primary" onClick={() => redirectTo(item)}>
              Update
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
