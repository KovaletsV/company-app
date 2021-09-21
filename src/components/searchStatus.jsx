import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const text = number < 5 && number > 1 ? "человека" : "человек";
    return number > 0
      ? `${number} ${text} тусанет с тобой сегодня`
      : "никто c тобой не тусанет";
  };
  const getBadgeClasses = (number) =>
    number === 0 ? "badge bg-danger" : "badge bg-primary";
  return (
    <h2>
      <span className={getBadgeClasses(length)}>{renderPhrase(length)}</span>
    </h2>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number,
};
export default SearchStatus;
