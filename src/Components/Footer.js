import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import '../App.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-4 w-100 d-flex">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold">Your conference</h5>
            <p className="mb-0">&copy;  All rights reserved </p>
          </div>
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
           <a href="https://unifi-me.com/" target="_blank" className="text-decoration-none text-light"><p className="mb-0" style={{color:"#ff9712"}}><span className="fw-bold text-light"> POWERED BY:</span> VIA UNIFI INFORMATION TECHNOLOGY </p></a>
          </div>
          {/* روابط السوشال ميديا */}
          <div className="col-md-4 text-center text-md-end div-footer-link">
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
