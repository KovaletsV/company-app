import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import Api from "./API";

function App() {
  const [users, setUsers] = useState(Api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id));
  };
  const handleToggleBookMark = (id) =>
    setUsers(
      users.map((item) =>
        item._id === id ? { ...item, status: !item.status } : item
      )
    );

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        onDelete={handleDelete}
        onToggleMark={handleToggleBookMark}
        users={users}
      />
    </div>
  );
}

export default App;
