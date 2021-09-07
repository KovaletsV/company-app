import React from "react";
import _ from "lodash";

const Pagination = (onPageChange, itemsCount, pageSize, currentPage) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  //   if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li className="page-item" key={page}>
            <a
              href="google.com"
              className="page-link"
              onClick={() => onPageChange()}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
