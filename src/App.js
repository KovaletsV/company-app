import React, { useState } from "react";
import Users from "./components/users";
import Api from "./API";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(Api.users.fetchAll());
  const handleDelete = (userId) =>
    setUsers(users.filter((user) => user._id !== userId));
  const handleToggleBookMark = (id) =>
    setUsers(
      users.map((item) =>
        item._id === id ? { ...item, favorites: !item.favorites } : item
      )
    );
  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleMark={handleToggleBookMark}
      />
    </div>
  );
};

export default App;
