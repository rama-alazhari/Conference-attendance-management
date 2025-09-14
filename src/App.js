import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Header from './Components/Header';
import DashboardUser from './Pages/Dashboard-User';
import EditUser from './Pages/Edit-User';
import AddNewUser from './Pages/Add-New-User';
import MembersPage from './Pages/MembersPage';
import VisitorsPage from './Pages/VisitorsPage';
import RegisterAttendance from './Pages/Register-Attendance';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/add-new-user" element={<AddNewUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />

        <Route path="/members" element={<MembersPage />} />
        <Route path="/visitors" element={<VisitorsPage />} />
        <Route path='/checkin' element={<RegisterAttendance/>} />

        <Route path="*" element={<h2>Not Found Page</h2>} />
      </Routes>

    </Router>
  );
}

export default App;
