import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaDownload,
  FaUpload,
  FaSearch,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from "../Components/Footer";

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Rama ALazhari",
      email: "rama@example.com",
      company: "Company A",
      phone: "123456",
      type: "Visitor",
      relatedMember: "Ahmed Ali",
      visitDate: "2025-09-10",
      active: true,
    },
    {
      id: 2,
      name: "reem rrrr",
      email: "reem@example.com",
      company: "Company B",
      phone: "987654",
      type: "Deputy",
      relatedMember: "Rama Hassan",
      visitDate: "2025-09-11",
      active: false,
    },
    {
      id: 3,
      name: "xxx xxx",
      email: "xxx@example.com",
      company: "Company x",
      phone: "912353",
      type: "Deputy",
      relatedMember: "Rama Hassan",
      visitDate: "2025-09-12",
      active: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editVisitor, setEditVisitor] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    type: "Visitor",
    relatedMember: "",
    visitDate: "",
    active: true,
  });
  const [search, setSearch] = useState("");

  // Open Add Modal
  const handleAdd = () => {
    setEditVisitor(null);
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      type: "Visitor",
      relatedMember: "",
      visitDate: "",
      active: true,
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (visitor) => {
    setEditVisitor(visitor);
    setForm(visitor);
    setShowModal(true);
  };

  // Save Visitor
  const handleSave = () => {
    if (editVisitor) {
      setVisitors(
        visitors.map((v) =>
          v.id === editVisitor.id ? { ...form, id: editVisitor.id } : v
        )
      );
    } else {
      setVisitors([...visitors, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  // Toggle Active
  const toggleActive = (id) => {
    setVisitors(
      visitors.map((v) => (v.id === id ? { ...v, active: !v.active } : v))
    );
  };

  // Download Excel Template
  const downloadTemplate = () => {
    const header = [
      [
        "Visitor Name",
        "Email",
        "Company",
        "Mobile Number",
        "Visitor Type",
        "Related Member",
        "Visit Date",
        "Active",
      ],
    ];
    const ws = XLSX.utils.aoa_to_sheet(header);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "visitors_template.xlsx"
    );
  };

  // Upload Excel
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const newVisitors = rows.map((row, index) => ({
        id: Date.now() + index,
        name: row["Visitor Name"] || "",
        email: row["Email"] || "",
        company: row["Company"] || "",
        phone: row["Mobile Number"] || "",
        type: row["Visitor Type"] || "Visitor",
        relatedMember: row["Related Member"] || "",
        visitDate: row["Visit Date"] || "",
        active: row["Active"]?.toString().trim() === "TRUE" ? true : false,
      }));

      setVisitors([...visitors, ...newVisitors]);
    };
    reader.readAsArrayBuffer(file);
  };

  // Filter visitors based on search
  const filteredVisitors = visitors.filter((v) =>
    [v.name, v.email, v.company, v.phone, v.type, v.relatedMember]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
     <div className="page">
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 ">
        <h3>Visitor Management</h3>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn me-2 text-light" style={{backgroundColor:"#3ab63c"}} onClick={handleAdd}>
            <FaPlus className="me-1" /> Add Visitor
          </button>
          <label className="btn me-2 mb-0 text-light" style={{backgroundColor:"#bfb75bff"}}>
            <FaUpload className="me-1" /> Upload Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              hidden
              onChange={handleUpload}
            />
          </label>
          <button className="btn text-light" style={{backgroundColor:"#218ae8"}} onClick={downloadTemplate}>
            <FaDownload className="me-1" /> Download Template
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="input-group mb-3">
        <span className="input-group-text bg-light">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search visitors by name, email, company, phone, type or related member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Visitors Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Visitor Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Mobile Number</th>
              <th>Visitor Type</th>
              <th>Related Member</th>
              <th>Visit Date</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (
                <tr key={visitor.id}>
                  <td>{visitor.name}</td>
                  <td>{visitor.email}</td>
                  <td>{visitor.company}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.type}</td>
                  <td>{visitor.relatedMember}</td>
                  <td>{visitor.visitDate}</td>
                  <td>
                    {visitor.active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2 mb-2 mb-lg-0"
                      onClick={() => handleEdit(visitor)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className={`btn btn-sm ${
                        visitor.active ? "btn-danger" : "btn-success"
                      }`}
                      onClick={() => toggleActive(visitor.id)}
                    >
                      {visitor.active ? <FaToggleOff /> : <FaToggleOn />}{" "}
                      {visitor.active ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No visitors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editVisitor ? "Edit Visitor" : "Add a New Visitor"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Visitor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Visitor Type</label>
                  <select
                    className="form-select"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="Visitor">Visitor</option>
                    <option value="Deputy">Deputy</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {form.type === "Visitor" ? "Invited By" : "Deputy For"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.relatedMember}
                    onChange={(e) =>
                      setForm({ ...form, relatedMember: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Visit Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.visitDate}
                    onChange={(e) =>
                      setForm({ ...form, visitDate: e.target.value })
                    }
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({ ...form, active: e.target.checked })
                    }
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      <Footer />
    </div>
  );
}
