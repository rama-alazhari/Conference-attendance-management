import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCheck, FaUsers, FaSearch } from "react-icons/fa";

export default function RegisterAttendance() {
  const [mode, setMode] = useState(null); // "members" or "visitors"
  const [search, setSearch] = useState("");
  const [checkedIds, setCheckedIds] = useState([]); // store checked-in IDs

  // Dummy data
  const members = [
    { id: 1, name: "Ahmed Ali", email: "ahmed@test.com", company: "Company A", phone: "123456" },
    { id: 2, name: "Rama Hassan", email: "rama@test.com", company: "Company B", phone: "987654" },
  ];

  const visitors = [
    { id: 1, name: "maya alazhari", email: "maya@example.com", company: "Company C", phone: "111222" },
    { id: 2, name: "aya aya", email: "aya@example.com", company: "Company D", phone: "333444" },
  ];

  // Filter list with search
  const filteredList = (mode === "members" ? members : visitors).filter((p) =>
    [p.name, p.email, p.company, p.phone].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Mark check-in
  const handleCheckIn = (id) => {
    if (!checkedIds.includes(id)) {
      setCheckedIds([...checkedIds, id]);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Event Check-in</h3>

      {/* Step 1: Choose Members or Visitors */}
      {!mode && (
        <div className="d-flex justify-content-center gap-4">
          <button
            className="btn btn-primary btn-lg px-5"
            onClick={() => setMode("members")}
          >
            <FaUsers className="me-2" /> Members
          </button>
          <button
            className="btn btn-success btn-lg px-5"
            onClick={() => setMode("visitors")}
          >
            <FaUserCheck className="me-2" /> Visitors
          </button>
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length > 0 ? (
                  filteredList.map((person) => {
                    const isChecked = checkedIds.includes(person.id);
                    return (
                      <tr
                        key={person.id}
                        className={isChecked ? "table-success" : ""}
                      >
                        <td>{person.name}</td>
                        <td>{person.email}</td>
                        <td>{person.company}</td>
                        <td>{person.phone}</td>
                        <td>
                          {isChecked ? (
                            <span className="badge bg-success">Checked-in</span>
                          ) : (
                            <span className="badge bg-secondary">Not yet</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            disabled={isChecked}
                            onClick={() => handleCheckIn(person.id)}
                          >
                            {isChecked ? "Checked-in" : "Check-in"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
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
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}



