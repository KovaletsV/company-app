import React from "react";
import { iconChosenTrue, iconChosenFalse } from "../utils/icons";

const BookMark = ({ status, onToggleMark, id }) => {
  const getChosen = () => (status ? iconChosenTrue : iconChosenFalse);
  return (
    <span role="button" onClick={() => onToggleMark(id)}>
      {getChosen()}
    </span>
  );
};

export default BookMark;
