import React, { useState } from 'react';  
import { motion } from "framer-motion";  
import { NavLink, useNavigate } from "react-router-dom";  
import axios from "axios";  
// import { create } from "zustand";  
// import { Loader } from "lucide-react";  


const Login = () => {  
    const [username, setUsername] = useState("");  
    const [password, setPassword] = useState("");  
    const navigate = useNavigate();  
    // const { login, error, isLoading } = useAuthStore();  

    // const handleLogin = async (e) => {  
    //     e.preventDefault();  
    //     try {  
    //         await login(username, password);  
    //         navigate("/");  
    //         window.location.reload();  
    //     } catch (error) {  
    //         console.log(error);  
    //     }  
    // };  

    return (  
        <motion.div className='container pt-5' initial={{ opacity: 0, scale: 0.9 }}  
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.9 }}  
            transition={{ duration: 0.5 }}  
        >  
            <div className='p-5 col-12 col-md-10 col-lg-6 m-auto' style={{ boxShadow: "1px 1px 20px 7px gray", borderRadius: "10px", margin: "auto" }}>  
                <div className='text-center'>  
                    <img   
                        src={require('../Images/logo.jpg')}   
                        width="90"   
                        height="90"   
                        className="mb-4"   
                        alt="Logo"   
                    />  
                    <h2 className="mb-3 fs-4">Conference Attendance Management System</h2>  
                </div>  
                <form >  
                    <div className="mb-3">  
                        <label htmlFor="exampleInputUsername" className="form-label">Eamil Address</label>  
                        <input   
                            type="email"   
                            className="form-control"   
                            id="exampleInputUsername"   
                            placeholder='Enter your email...'  
                            value={username}   
                            onChange={(e) => setUsername(e.target.value)}   
                        />  
                    </div>  
                    <div className="mb-3">  
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>  
                        <input   
                            type="password"   
                            className="form-control"   
                            id="exampleInputPassword1"   
                            placeholder='Enter your password...'   
                            value={password}   
                            onChange={(e) => setPassword(e.target.value)}   
                        />  
                    </div>  
                    {/* {error && <p className='text-danger fs-5 mb-2'>{error}</p>}   */}
                    <button type="submit" className="btn text-light w-100" style={{backgroundColor:"#ff9712"}} >  Login
                        {/* {isLoading ? <Loader className='w-25 h-6 animate-spin mx-auto' /> : "Login"}   */}
                    </button>  
                </form>       
                   
            </div>  
        </motion.div>  
    );  
}  

export default Login;  