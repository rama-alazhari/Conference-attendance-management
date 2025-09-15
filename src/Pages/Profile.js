import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaPhone, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Footer from '../Components/Footer';
import { motion } from "framer-motion";  

// إعداد Axios مرة واحدة هنا
const baseURL = 'http://localhost:8000/'; // عدل الرابط حسب السيرفر عندك

const Axios = axios.create({
  baseURL,
  withCredentials: true,
});

// إضافة التوكن إذا موجود
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Profile = () => {

  // بدي ظبط تعديل كلمة السر و حذف الحساب

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    number: '',
    _id: '',
    password: '',
    dateOfBirth: '',
    tin: '',
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // جلب البيانات
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await Axios.get('/my-profile');
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        toast.error('❌ Failed to fetch data.', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // تحديث الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // تحديث الملف الشخصي
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put("/update-profile", userData);
      setUserData(response.data);
      toast.success('✅ Profile updated successfully!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      setIsEditing(false);
    } catch {
      toast.error('❌ Failed to update profile.', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  // حذف الحساب
  // const handleDeleteAccount = async () => {
  //     try {
  //         await Axios.delete(`/users/${userData._id}`);
  //         toast.success('🗑️ Account deleted successfully!', {
  //             position: "bottom-center",
  //             autoClose: 2000,
  //             hideProgressBar: true,
  //         });
  //     } catch {
  //         toast.error('❌ Failed to delete account', {
  //             position: "bottom-center",
  //             autoClose: 2000,
  //             hideProgressBar: true,
  //         });
  //     } finally {
  //         setShowDeleteModal(false);
  //     }
  // };
// الانتقال بين صفحة واخرى تظهر رسالة انتظر
  // if (loading) return <div>Loading....</div>;


  return (
    <div className="page">
      {/* <!-- --------main profile-------- --> */}
      <motion.main className="container my-4 flex-grow-1"    >
        <div className="row g-4">
          {/* Profile & Password side by side */}
          <motion.div className="col-md-6" initial={{ opacity: 0, scale: 0.9 }}  
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.9 }}  
            transition={{ duration: 0.5 }}>
            <div className="shadow-sm p-3 bg-body rounded h-100">
              <div
                className="p-3 rounded mb-3"
                style={{
                  background:
                    "linear-gradient(to right, #5b5b5bff, #959595ff, #abababff, #ffcba3ff)",
                  color: "white",
                }}
              >
                <h4>👤 Profile Information</h4>
                <p>Update your account's profile info and email.</p>
              </div>

              <form className="shadow-sm p-3 bg-light rounded" onSubmit={handleSubmit}>
                <label>Full Name</label>
                <div className="position-relative w-100 mb-3">
                  <FaUser
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      fontSize: "1.2rem",
                    }}
                  />
                  <input
                    className="form-control ps-5"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <label>Email Address</label>
                <div className="position-relative w-100 mb-3">
                  <MdEmail
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      fontSize: "1.2rem",
                    }}
                  />
                  <input
                    className="form-control ps-5"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="text-center mt-3">
                  {!isEditing ? (
                    <button
                      type="button"
                      className="btn text-light fw-bold"
                      style={{
                        background:
                          "linear-gradient(to right, #0f8226ff, #14a731ff)",
                      }}
                      onClick={() => setIsEditing(true)}
                    >
                      Update Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn me-2 text-light"
                        style={{
                          background:
                            "linear-gradient(to right, #0f8226ff, #14a731ff)",
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary text-light"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Password Section */}
          <motion.div className="col-md-6" initial={{ opacity: 0, scale: 0.9 }}  
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.9 }}  
            transition={{ duration: 0.9 }}>
            <div className="shadow-sm p-3 bg-body rounded h-100">
              <div
                className="p-3 rounded mb-3"
                style={{
                  background:
                    "linear-gradient(to right, #5b5b5bff, #959595ff, #abababff, #ffcba3ff)",
                  color: "white",
                }}
              >
                <h4>🔑 Change Password</h4>
                <p>Update your account password.</p>
              </div>

              <form className="shadow-sm p-3 bg-light rounded">
                <label>Current Password</label>
                <div className="position-relative w-100 mb-3">
                  <FaLock
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      fontSize: "1.2rem",
                    }}
                  />
                  <input className="form-control ps-5" type="password" />
                </div>

                <label>New Password</label>
                <div className="position-relative w-100 mb-3">
                  <FaLock
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      fontSize: "1.2rem",
                    }}
                  />
                  <input className="form-control ps-5" type="password" />
                </div>

                <div className="text-center mt-3">
                  <button
                    className="btn text-light fw-bold"
                    style={{
                      background:
                        "linear-gradient(to right, #0f8226ff, #14a731ff)",
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Delete Account full width */}
        <motion.div className="row mt-4" initial={{ opacity: 0, scale: 0.9 }}  
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.9 }}  
            transition={{ duration: 1.2 }}>
          <div className="col-12">
            <div className="shadow-sm p-3 bg-body rounded">
              <div
                className="p-3 rounded mb-3"
                style={{
                  background:
                    "linear-gradient(to right, #5b5b5bff, #959595ff, #abababff, #ffcba3ff)",
                  color: "white",
                }}
              >
                <h4>❌ Delete Account</h4>
                <p>
                  Once your account is deleted, all of its resources and data will be
                  permanently deleted. Please download any data you want to keep.
                </p>
              </div>
              <div className="text-center">
                <button
                  className="btn text-light fw-bold"
                  style={{
                    background: "linear-gradient(to right, #dc0012ff, #f50014ff)",
                  }}
                >
                  DELETE ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.main>

      <Footer />

    </div>
  )
}

export default Profile
