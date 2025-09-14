import React, { useState, useEffect } from "react";
import { useParams, useNavigate,  NavLink } from "react-router-dom";
import { FcPrevious } from "react-icons/fc";


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // مثال لجلب المستخدم (هنا حطيت داتا افتراضية)
    setUser({ username: "ahmed", email: "ahmed@example.com", password: "" });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ User updated successfully!");
    navigate("/dashboard-user");
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
         <NavLink to="..">
          <FcPrevious className="fs-4" onClick={(e) => {
            e.preventDefault(); // لإيقاف التوجه الافتراضي
            navigate(-1);
          }} />
        </NavLink>
        <h4 className="mb-3 text-center">✏️ Edit User</h4>
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
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
