import React from "react";
import Quality from "./quality";
import BookMark from "./bookMark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  status,
  onDelete,
  onToggleMark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((badge) => (
          <Quality key={badge._id} {...badge} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <BookMark status={status} onToggleMark={onToggleMark} id={_id} />
      </td>
      <td>
        <button
          onClick={() => onDelete(_id)}
          type="button"
          className="btn btn-danger"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
