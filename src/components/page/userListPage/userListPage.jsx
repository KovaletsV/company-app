import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import API from "../../../API";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import TextField from "../../common/form/textField";

const UserListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    //Принятие данных (server)
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    //Установка количество отображаемых пользователей на странице
    const pageSize = 4;
    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    //Удаление ползователя из списка
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => userId !== user._id));
    };
    //Выбор флага 'избранное'
    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            }),
        );
    };
    //Метод поиска людей
    const clearFilter = () => {
        setSelectedProf();
    };
    const handleUserSearch = (target) => {
        clearFilter();
        setSearchUser(target.value);
    };
    //Выбор профессии
    const handleProfessionSelect = (item) => {
        setSearchUser("");
        setSelectedProf(item);
    };
    //Выбор страницы
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    //Создаем функцию для сортировки
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const searchedUsers = searchUser
            ? users.filter((user) => user.name.toLowerCase().match(searchUser))
            : users;
        //Фильтр пользователей по профессии
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf),
              )
            : searchedUsers;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order],
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
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
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <TextField
                        name="search"
                        className="w-100"
                        value={searchUser}
                        onChange={handleUserSearch}
                        placeholder="Search..."
                    />

                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return "loading...";
};
UserListPage.propTypes = {
    users: PropTypes.array,
    match: PropTypes.object,
};
export default UserListPage;
