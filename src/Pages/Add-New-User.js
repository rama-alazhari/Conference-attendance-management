import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcPrevious } from "react-icons/fc";
import { motion } from "framer-motion";

const AddNewUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ User added successfully!");
    navigate("/dashboard-user");
  };

  return (
    <motion.div className="container my-5" initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}  >
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <NavLink to="..">
          <FcPrevious className="fs-4" onClick={(e) => {
            e.preventDefault(); // لإيقاف التوجه الافتراضي
            navigate(-1);
          }} />
        </NavLink>
        <h4 className="mb-3 text-center">➕ Add New User</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add User
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddNewUser;
