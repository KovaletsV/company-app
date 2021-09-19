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
  onDelete,
  status,
  onToggleBookMark,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Quality {...qual} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={status} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
