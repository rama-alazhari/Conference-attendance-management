import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

export default function MembersPage() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "ahmed",
      email: "ahmed@test.com",
      company: "company A",
      phone: "123456",
      active: true,
    },
    {
      id: 2,
      name: "rama",
      email: "rama@test.com",
      company: "company B",
      phone: "987654",
      active: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    active: true,
  });

  const [search, setSearch] = useState(""); // 🔍 حالة البحث

  // فتح المودال للإضافة
  const handleAdd = () => {
    setEditMember(null);
    setForm({ name: "", email: "", company: "", phone: "", active: true });
    setShowModal(true);
  };

  // فتح المودال للتعديل
  const handleEdit = (member) => {
    setEditMember(member);
    setForm(member);
    setShowModal(true);
  };

  // حفظ البيانات
  const handleSave = () => {
    if (editMember) {
      setMembers(
        members.map((m) =>
          m.id === editMember.id ? { ...form, id: editMember.id } : m
        )
      );
    } else {
      setMembers([...members, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  // تفعيل/إيقاف
  const toggleActive = (id) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m
      )
    );
  };

  // تنزيل قالب Excel
  const downloadTemplate = () => {
    const header = [["User Name", "Email", "Company", "Mobile Number", "Active"]];
    const ws = XLSX.utils.aoa_to_sheet(header);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "members_template.xlsx"
    );
  };

  // رفع ملف Excel
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

      const newMembers = rows.map((row, index) => ({
        id: Date.now() + index,
        name: row["User Name"] || "",
        email: row["Email"] || "",
        company: row["Company"] || "",
        phone: row["Mobile Number"] || "",
        active: row["Active"]?.toString().trim() === "TRUE",
      }));

      setMembers([...members, ...newMembers]);
    };
    reader.readAsArrayBuffer(file);
  };

  // 🔍 فلترة الأعضاء حسب البحث
  const filteredMembers = members.filter((m) => {
    const query = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.company.toLowerCase().includes(query) ||
      m.phone.toLowerCase().includes(query) ||
      (m.active ? "active" : "inactive").includes(query)
    );
  });

  return (
    <div className="page">
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <h3>Member Management</h3>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn text-light" style={{backgroundColor:"#3ab63c"}} onClick={handleAdd}>
            <FaPlus className="me-1" /> Add a Member
          </button>
          <label className="btn text-light mb-0" style={{backgroundColor:"#bfb75bff"}}>
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

      {/* 🔍 مربع البحث */}
      <div className="input-group mb-3 shadow-sm">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, company, phone, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* جدول الأعضاء */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Mobile Number</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.company}</td>
                  <td>{member.phone}</td>
                  <td>
                    {member.active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2 mb-2 mb-lg-0"
                      onClick={() => handleEdit(member)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className={`btn btn-sm ${
                        member.active ? "btn-danger" : "btn-success"
                      }`}
                      onClick={() => toggleActive(member.id)}
                    >
                      {member.active ? <FaToggleOff /> : <FaToggleOn />}{" "}
                      {member.active ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))
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

      {/* Modal الإضافة/التعديل */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMember ? "Edit Member" : "Add a new member"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">User Name</label>
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
