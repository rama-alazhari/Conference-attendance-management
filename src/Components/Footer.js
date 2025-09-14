import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container">
        <div className="row align-items-center">
          {/* النص */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold">Your conference</h5>
            <p className="mb-0">&copy;  All rights reserved </p>
          </div>

          {/* روابط السوشال ميديا */}
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-light me-3 fs-5">
              <FaEnvelope />
            </a>
            <a href="#" className="text-light me-3 fs-5">
              <FaFacebook />
            </a>
            <a href="#" className="text-light me-3 fs-5">
              <FaTwitter />
            </a>
            <a href="#" className="text-light fs-5">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
