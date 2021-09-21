import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";
import Api from "../API";
import SearchStatus from "./searchStatus";

const Users = ({ users, onDelete, onToggleMark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  //Принятие данных (server)
  useEffect(() => {
    Api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  //Установка количество отображаемых пользователей на странице
  const pageSize = 2;
  //Выбор профессии
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  //Выбор страницы
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  //Фильтр пользователей по профессии
  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users;
  const count = filteredUsers.length;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);
  //Начальное состояние профессий
  const clearFilter = () => {
    setSelectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
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
              {usersCrop.map((user) => (
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
Users.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleMark: PropTypes.func,
};
export default Users;
