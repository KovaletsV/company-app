import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  //Определяем количество страниц
  const pagesCount = Math.ceil(itemsCount / pageSize);
  //Создаём массив с количеством страниц
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={"page-item " + (page === currentPage ? "active" : "")}
          >
            <a
              href="/#"
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
