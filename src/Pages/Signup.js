import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// ✅ مكون عرض شروط كلمة المرور
const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2">
      {criteria.map((item) => (
        <div
          key={item.label}
          className="d-flex align-items-center"
          style={{ fontSize: "12px", color: item.met ? "green" : "gray" }}
        >
          {item.met ? "✔" : "✖"}
          <span className="ms-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ✅ مكون قياس قوة كلمة المرور
const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const strengthColors = ["red", "orangered", "orange", "gold", "green"];
  const strengthTexts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between mb-1" style={{ fontSize: "12px", color: "gray" }}>
        <span>Password strength</span>
        <span>{strengthTexts[strength]}</span>
      </div>

      <div className="d-flex gap-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            style={{
              height: "5px",
              width: "25%",
              borderRadius: "4px",
              transition: "background-color 0.3s",
              backgroundColor: index < strength ? strengthColors[strength] : "lightgray",
            }}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

// ✅ صفحة Signup
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <section className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="container p-4"
        style={{
          maxWidth: "500px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          background: "#fff",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#ff9712" }}>
          Create Account
        </h2>

        <form>
          {/* Full Name */}
          <div className="position-relative mb-3">
            <span
              className="position-absolute top-50 translate-middle-y ms-3"
              style={{ fontSize: "18px" }}
            >
              👤
            </span>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="position-relative mb-3">
            <span
              className="position-absolute top-50 translate-middle-y ms-3"
              style={{ fontSize: "18px" }}
            >
              ✉️
            </span>
            <input
              type="email"
              className="form-control ps-5"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="position-relative mb-3">
            <span
              className="position-absolute top-50 translate-middle-y ms-3"
              style={{ fontSize: "18px" }}
            >
              🔑
            </span>
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <PasswordStrengthMeter password={password} />

          {/* Submit button */}
          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              color: "#fff",
              backgroundColor: "#ff9712",
              borderRadius: "6px",
              height: "40px",
              fontWeight: "500",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <NavLink to="/login" style={{ color: "#ff9712" }}>
              Login Now!
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
