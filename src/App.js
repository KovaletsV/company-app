import React, { useState, useEffect } from "react";
import Users from "./components/users";
import Api from "./API";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    Api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);
  //Удаление ползователя из списка
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id));
  };
  //Выбор флага 'избранное'
  const handleToggleBookMark = (id) =>
    setUsers(
      users.map((item) =>
        item._id === id ? { ...item, status: !item.status } : item
      )
    );

  return (
    <div>
      {users && (
        <Users
          onDelete={handleDelete}
          onToggleMark={handleToggleBookMark}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
