import React from "react";
import { NavLink } from "react-router-dom"

const Header = () => {

  return (
    <>
      <div className="navbars w-100">
        <div className="d-flex flex-row-reverse text-light fs-5 list-unstyled p-2" style={{ backgroundColor: "#ff9712" }}>
          <NavLink to="/profile" className="text-decoration-none text-light"><li className="me-5">Profile</li></NavLink>
          <NavLink to="/dashboard-user" className="text-decoration-none text-light"><li className="me-5">Admin Panel</li></NavLink>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: "#ffff" }}>
          <div className="container-fluid">
            <img src={require('../Images/logo-removebg-preview.png')} width={100} height={70} />
           <NavLink to="/" className="text-decoration-none"><span className="navbar-brand fw-bold text-dark">Conference Dashboard</span></NavLink> 
           <NavLink to="/login"><button className="btn btn-outline-light" style={{ backgroundColor: "#ff9712" }}>Login</button></NavLink>
          </div>
        </nav>
      </div>

    </>
  )


}
export default Header

