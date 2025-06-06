import React, { useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Manager", status: "Pending" },
  ]);

  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  });

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input
  };

  const handleAddUser = () => {
    let errors = {};

    if (!addFormData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!addFormData.email.trim()) {
      errors.email = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...addFormData,
    };

    setUsers([...users, newUser]);
    setAddFormData({ name: "", email: "", role: "User", status: "Active" });
    setFormErrors({ name: "", email: "" });
  };

  const handleChange = (id, field, value) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">User Management</h2>

      {/* Add User Form */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={addFormData.name}
            onChange={handleAddChange}
            placeholder="Name *"
            className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            value={addFormData.email}
            onChange={handleAddChange}
            placeholder="Email *"
            className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>
        <select
          name="role"
          value={addFormData.role}
          onChange={handleAddChange}
          className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option>Admin</option>
          <option>User</option>
          <option>Manager</option>
        </select>
        <select
          name="status"
          value={addFormData.status}
          onChange={handleAddChange}
          className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="py-3 px-6 text-left">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">
                <select
                  value={user.role}
                  onChange={(e) => handleChange(user.id, "role", e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                >
                  <option>Admin</option>
                  <option>User</option>
                  <option>Manager</option>
                </select>
              </td>
              <td className="py-3 px-6 text-left">
                <select
                  value={user.status}
                  onChange={(e) => handleChange(user.id, "status", e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;