import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import Footer from "../Components/Footer";

export default function ReportPage() {
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Dummy data for report
    const reports = [
        {
            id: 1,
            name: "Ahmed Ali",
            company: "Company A",
            email: "ahmed@test.com",
            phone: "123456",
            memberOrVisitor:"member",
            type: "Visitor",
            date: "2025-09-12",
            linkedMember: "Dr. Khaled",
        },
        {
            id: 2,
            name: "Rama Hassan",
            company: "Company B",
            email: "rama@test.com",
            phone: "987654",
             memberOrVisitor:"member",
            type: "Deputy",
            date: "2025-09-13",
            linkedMember: "Prof. Sami",
        },
        {
            id: 3,
            name: "Maya Alazhari",
            company: "Company C",
            email: "maya@example.com",
            phone: "111222",
             memberOrVisitor:"Visitor",
            type: "Visitor",
            date: "2025-09-15",
            linkedMember: "Dr. Khaled",
        },
    ];

    // Filtering logic
    const filteredReports = reports.filter((r) => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchesFrom = fromDate ? r.date >= fromDate : true;
        const matchesTo = toDate ? r.date <= toDate : true;
        return matchesSearch && matchesFrom && matchesTo;
    });

    return (
        <div className="page">
            <div className="container py-4">
                <h3 className="text-center mb-4">Attendance Report</h3>

                {/* Filters Section */}
                <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 mb-2">
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaCalendarAlt />
                            </span>
                            <input
                                type="date"
                                className="form-control"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3 mb-2">
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <FaCalendarAlt />
                            </span>
                            <input
                                type="date"
                                className="form-control"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-2 mb-2">
                        <button
                            className="btn w-100 text-light" style={{backgroundColor:"#ff4343"}}
                            onClick={() => {
                                setSearch("");
                                setFromDate("");
                                setToDate("");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Report Table */}
                <div className="table-responsive shadow-sm">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Mobile Number</th>
                                <th>Member/Visitor</th>
                                <th>Visited Date</th>
                                <th>Visitor Type</th>
                                <th>Related Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.name}</td>
                                        <td>{r.email}</td>
                                        <td>{r.company}</td>
                                        <td>{r.phone}</td>
                                        <td>{r.memberOrVisitor}</td>
                                        <td>{r.date}</td>
                                        <td>{r.type}</td>
                                        <td>{r.linkedMember}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-muted">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}
