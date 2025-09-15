import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaUserCheck, FaClipboardCheck } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container-fluid min-vh-100 d-flex flex-column bg-light">
        <h2 className="fw-bold text-center pt-4 bg-light">Conference Dashboard</h2>

        {/* Main Content */}
        <div className="pt-0 pt-md-3 d-flex align-items-center justify-content-center">
          <div className="row w-100 justify-content-center p-3">
            {/* Card 1 - الأعضاء */}
            <div className="col-12 col-md-6 p-2">
              <Link
                className="card shadow-lg border-0 text-center h-100 hover-card"
                style={{ borderRadius: "20px", cursor: "pointer", textDecoration: "none" }}
                to="/members"
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <FaUsers className="text-primary fs-1 mb-3" />
                  <h5 className="card-title fw-bold">Members</h5>
                  <p className="card-text text-muted">
                    Managing member information and updating their data
                  </p>
                </div>
              </Link>
            </div>

            {/* Card 2 - الزوار */}
            <div className="col-12 col-md-6 p-2">
              <Link
                className="card shadow-lg border-0 text-center h-100 hover-card"
                style={{ borderRadius: "20px", cursor: "pointer", textDecoration: "none" }}
                to="/visitors"
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <FaUserCheck className="text-success fs-1 mb-3" />
                  <h5 className="card-title fw-bold">Visitors</h5>
                  <p className="card-text text-muted">
                    Add and manage visitor or MP data
                  </p>
                </div>
              </Link>
            </div>

            {/* Card 3 - تسجيل الحضور */}
            <div className="col-12 col-md-6 mt-0 mt-md-5 p-2">
              <Link
                className="card shadow-lg border-0 text-center h-100 hover-card"
                style={{ borderRadius: "20px", cursor: "pointer", textDecoration: "none" }}
                to="/checkin"
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <FaClipboardCheck className="text-danger fs-1 mb-3" />
                  <h5 className="card-title fw-bold">Register Attendance</h5>
                  <p className="card-text text-muted">
                    Confirm the attendance of members and visitors at the event
                  </p>
                </div>
              </Link>
            </div>

            {/* Card 4 - واجهة تقرير*/}
            <div className="col-12 col-md-6 mt-0 mt-md-5 p-2">
              <Link
                className="card shadow-lg border-0 text-center h-100 hover-card"
                style={{ borderRadius: "20px", cursor: "pointer", textDecoration: "none" }}
                to="/reports"
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <TbReportAnalytics className="text-warning fs-1 mb-3" />
                  <h5 className="card-title fw-bold">Reports</h5>
                  <p className="card-text text-muted">
                    View a report on registered visitors
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
