import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser, addUser } from "../services/apiServices";
import UserForm from "./userForm";
import Pagination from "./pagination";
import { PencilSquareIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import styles from "./userList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
  });

  useEffect(() => {
    loadUsers(pagination.currentPage);
  }, [pagination.currentPage]);

  const loadUsers = async (page) => {
    try {
      const { users: fetchedUsers, pagination: fetchedPagination } = await fetchUsers(page, pagination.itemsPerPage);
      setUsers(fetchedUsers);
      setPagination((prev) => ({ ...prev, ...fetchedPagination }));
      setError(null);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      // Reload current page
      loadUsers(pagination.currentPage);
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  const handleSubmit = async (userData) => {
    try {
      if (isAddingNew) {
        // For creating a new user
        await addUser(userData);
      } else if (selectedUser) {
        // For updating an existing user
        await updateUser(selectedUser.id, userData);
      }
      
      // Reload current page to reflect changes
      loadUsers(pagination.currentPage);
      
      // Reset form state
      setIsEditing(false);
      setIsAddingNew(false);
      setSelectedUser(null);
    } catch (err) {
      setError(isAddingNew ? "Failed to add user" : "Failed to update user");
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>User Management</h2>
        <button
          onClick={() => {
            setIsAddingNew(true);
            setIsEditing(true);
            setSelectedUser(null);
          }}
          className={styles.btnPrimary}
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          {error}
        </div>
      )}

      {isEditing ? (
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsEditing(false);
            setSelectedUser(null);
            setIsAddingNew(false);
          }}
          isAddingNew={isAddingNew}
        />
      ) : (
        <>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {["ID", "Name", "Email", "Company", "Actions"].map((header) => (
                  <th key={header} className={styles.tableHeader}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{user.id}</td>
                  <td className={styles.tableCell}>{user.name}</td>
                  <td className={styles.tableCell}>{user.email}</td>
                  <td className={styles.tableCell}>{user.company?.name}</td>
                  <td className={styles.tableCell}>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditing(true);
                        setIsAddingNew(false);
                      }}
                      className={styles.btnSecondary}
                    >
                      <PencilSquareIcon className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className={styles.btnDanger}
                    >
                      <TrashIcon className="h-5 w-5 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UserList;