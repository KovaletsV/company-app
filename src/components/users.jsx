import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";

const Users = ({ users, onDelete, onToggleMark }) => {
  const count = users.length;
  const pageSize = 4;
  const { currentPage, setCurrentPage } = useState(1);
  const handlePageChange = (pageIndex) => {
    console.log(pageIndex);
    setCurrentPage(pageIndex);
  };
  return (
    <>
      {count > 0 && (
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                onDelete={onDelete}
                onToggleMark={onToggleMark}
                {...user}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPAge={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
