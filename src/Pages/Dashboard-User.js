import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const DashboardUser = () => {
  const [users, setUsers] = useState([
    { _id: "u1", username: "ahmed", email: "ahmed@example.com", role:"Admin" ,site:"xx" },
    { _id: "u2", username: "rama", email: "rama@example.com",role:"User" ,site:"xx" },
    { _id: "u3", username: "samir", email: "samir@example.com",role:"User" ,site:"xx" },
  ]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    const result = users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u._id !== id));
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
     {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
     {
      name: "Site",
      selector: (row) => row.site,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (user) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning  text-light"
            onClick={() => navigate(`/edit-user/${user._id}`)}
          >
             <FaEdit className="fs-4" />
          </button>
          <button
            className="btn btn-sm text-light" style={{background: "linear-gradient(to right, #dc0012ff, #f50014ff" }}
            onClick={() => deleteUser(user._id)}
          >
             <MdDelete className="fs-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container my-4">
      <DataTable
        title="📋 Users Dashboard"
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        responsive
        fixedHeader
        actions={
          <button
            className="btn text-light" style={{backgroundColor:"#218ae8"}}
            onClick={() => navigate("/add-new-user")}
          >
            + Add New User
          </button>
        }
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="🔍 Search..."
            className="form-control w-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  );
};

export default DashboardUser;
