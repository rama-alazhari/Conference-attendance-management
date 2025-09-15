import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCheck, FaUsers, FaSearch, FaCheckCircle } from "react-icons/fa";
import Footer from "../Components/Footer";

export default function RegisterAttendance() {
  const [mode, setMode] = useState(null);
  const [search, setSearch] = useState("");
  const [checkedIds, setCheckedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [amount, setAmount] = useState("");
  const [visitorPayments, setVisitorPayments] = useState({});
  const [visitorCheckins, setVisitorCheckins] = useState([]);
  const [toast, setToast] = useState(null); // لتخزين الرسالة المؤقتة

  // Dummy data
  const members = [
    { id: 1, name: "Ahmed Ali", email: "ahmed@test.com", company: "Company A", phone: "123456" },
    { id: 2, name: "Rama Hassan", email: "rama@test.com", company: "Company B", phone: "987654" },
  ];

  const visitors = [
    { id: 1, name: "Maya Alazhari", email: "maya@example.com", company: "Company C", phone: "111222" },
    { id: 2, name: "Aya Aya", email: "aya@example.com", company: "Company D", phone: "333444" },
  ];

  // Filter list with search
  const filteredList = (mode === "members" ? members : visitors).filter((p) =>
    [p.name, p.email, p.company, p.phone].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Show temporary toast
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Handle Member check-in (with payment modal)
  const handleCheckIn = (person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  // Confirm Member payment and check-in
  const confirmCheckIn = () => {
    if (amount.trim() === "") {
      alert("Please enter the payment amount!");
      return;
    }
    setCheckedIds([...checkedIds, selectedPerson.id]);
    showToast(`✅ Welcome to ${selectedPerson.name}`);
    setModalOpen(false);
    setAmount("");
    setSelectedPerson(null);
  };

  // Handle Visitor payment
  const handleVisitorPayment = (person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  // Confirm Visitor payment
  const confirmVisitorPayment = () => {
    if (amount.trim() === "") {
      alert("Please enter the payment amount!");
      return;
    }
    setVisitorPayments({
      ...visitorPayments,
      [selectedPerson.id]: amount,
    });
    setModalOpen(false);
    setAmount("");
    setSelectedPerson(null);
  };

  // Handle Visitor Check-in
  const handleVisitorCheckIn = (person) => {
    // if (!visitorPayments[person.id]) {
    //   alert("Please register payment before check-in!");
    //   return;
    // }
    setVisitorCheckins([...visitorCheckins, person.id]);
    showToast(`✅ Welcome to ${person.name}`);
  };

  return (
    <div className="page">
      <div className="container py-4">
        <h3 className="text-center mb-4">Register Attendance</h3>

        {/* Toast message */}
        {toast && (
          <div className="alert alert-success text-center fs-5 shadow-sm">
            <FaCheckCircle className="me-2" />
            {toast}
          </div>
        )}

        {/* Step 1: Choose Members or Visitors */}
        {!mode && (
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div
                className="card text-center border-0 h-100 shadow-lg option-card"
                style={{
                  background: "linear-gradient(135deg, #1d72b8, #4fc3f7)",
                  borderRadius: "20px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onClick={() => setMode("members")}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-white py-5">
                  <FaUsers size={70} className="mb-3" />
                  <h2 className="fw-bold mb-0">Members</h2>
                  <p className="mt-2 mb-0">Manage and check-in official members</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div
                className="card text-center border-0 h-100 shadow-lg option-card"
                style={{
                  background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                  borderRadius: "20px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onClick={() => setMode("visitors")}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-white py-5">
                  <FaUserCheck size={70} className="mb-3" />
                  <h2 className="fw-bold mb-0">Visitors</h2>
                  <p className="mt-2 mb-0">Check-in and manage event visitors</p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Step 2: Show List with Search */}
        {mode && (
          <div className="mt-4">
            <h5>{mode === "members" ? "Members List" : "Visitors List"}</h5>

            {/* Search box */}
            <div className="input-group mb-3">
              <span className="input-group-text bg-light">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, company or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="table-responsive shadow-sm">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Phone</th>
                    {mode === "visitors" && <th>Payment</th>}
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((person) => {
                      const isChecked = checkedIds.includes(person.id);
                      const payment = visitorPayments[person.id];
                      const isVisitorChecked = visitorCheckins.includes(person.id);

                      return (
                        <tr
                          key={person.id}
                          className={
                            isChecked || isVisitorChecked ? "table-success" : ""
                          }
                        >
                          <td>{person.name}</td>
                          <td>{person.email}</td>
                          <td>{person.company}</td>
                          <td>{person.phone}</td>
                          {mode === "visitors" && (
                            <td>
                              {payment ? (
                                <span className="badge bg-info">{payment} $</span>
                              ) : (
                                <span className="text-muted">No payment</span>
                              )}
                            </td>
                          )}
                          <td>
                            {mode === "members" ? (
                              isChecked ? (
                                <span className="badge bg-success">Checked-in</span>
                              ) : (
                                <span className="badge bg-secondary">Not yet</span>
                              )
                            ) : isVisitorChecked ? (
                              <span className="badge bg-success">Checked-in</span>
                            ) : payment ? (
                              <span className="badge bg-info">Paid</span>
                            ) : (
                              <span className="badge bg-warning">Pending</span>
                            )}
                          </td>
                          <td className="d-flex gap-2">
                            {mode === "members" ? (
                              <button
                                className="btn btn-sm btn-success"
                                disabled={isChecked}
                                onClick={() => handleCheckIn(person)}
                              >
                                {isChecked ? "Checked-in" : "Check-in"}
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-sm btn-success"
                                  disabled={isVisitorChecked}
                                  onClick={() => handleVisitorCheckIn(person)}
                                >
                                  {isVisitorChecked ? "Checked-in" : "Check-in"}
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleVisitorPayment(person)}
                                >
                                  Paying
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={mode === "visitors" ? "7" : "6"}
                        className="text-center text-muted"
                      >
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              className="btn btn-secondary mt-3"
              onClick={() => {
                setMode(null);
                setSearch("");
                setCheckedIds([]);
                setVisitorPayments({});
                setVisitorCheckins([]);
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>

      {/* Modal for Payment / Check-in */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {mode === "members" ? "Member Check-in" : "Visitor Payment"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  {mode === "members"
                    ? "Please enter amount to confirm attendance registration"
                    : "Register the amount paid"}
                </p>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    mode === "members" ? confirmCheckIn() : confirmVisitorPayment()
                  }
                >
                  {mode === "members" ? "Confirm & Check-in" : "Save Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
