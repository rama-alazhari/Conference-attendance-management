import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMoneyBillWave } from "react-icons/fa";
import Footer from "../Components/Footer";

export default function Settings() {
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    alert(`Saved amount: ${amount}`);
    // هنا لاحقاً تربط الحفظ بالـ backend أو localStorage
  };

  return (
    <div className="page d-flex flex-column">
      <div className="container py-5  d-flex justify-content-center align-items-center">
        <div className="card shadow-lg w-100" style={{ maxWidth: "500px" }}>
          <div className="card-header text-white text-center p-2" style={{backgroundColor:"#218ae8"}}>
            <h4 className="mb-0">Settings</h4>
          </div>
          <div className="card-body p-5">
            <label className="form-label fw-bold">The amount to be paid to the visitor</label>
            <div className="input-group mb-4">
              <span className="input-group-text bg-light">
                <FaMoneyBillWave />
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="input-group-text">AED</span>
            </div>

            <button
              className="btn w-100 py-2 fw-bold text-light" style={{backgroundColor:"#3ab63c"}}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
