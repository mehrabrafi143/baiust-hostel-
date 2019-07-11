import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
const Pagination = ({ pageSize, count, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;

  const arr = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {arr.map(i => (
          <li
            className={currentPage === i ? "page-item active" : "page-item"}
            key={i}
            onClick={() => onPageChange(i)}
          >
            <Link className="page-link" to="#">
              {i}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
