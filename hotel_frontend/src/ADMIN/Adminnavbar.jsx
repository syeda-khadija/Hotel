import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUser,
  FaBed,
  FaHome,
  FaClipboardList,
  FaComments,
  FaInfoCircle,
  FaUsers
} from 'react-icons/fa';

export default function Adminnavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? '#fff' : '#ccc',
    backgroundColor: isActive(path) ? '#e63946' : 'transparent',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    padding: '12px 16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
  });

  return (
    <>
      {/* Top Navbar */}
      <div style={{
        height: '60px',
        backgroundColor: '#111',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: '2px solid #e63946',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaHome size={26} color="#e63946" />
          <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>
            Admin Panel
          </span>
        </div>

        {/* Custom Logout Button */}
        <Link to="/logout" className="btn btn-danger">
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </Link>
      </div>

      {/* Sidebar */}
      <div style={{
        height: '100vh',
        width: '240px',
        position: 'fixed',
        top: '60px',
        left: 0,
        backgroundColor: '#1a1a1a',
        padding: '25px 20px',
        borderRight: '2px solid #e63946',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '20px',
          color: '#e63946',
          marginBottom: '25px',
          textAlign: 'center',
        }}>
          ⚔️ MENU
        </div>

        <nav>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <li><Link to="/s" style={linkStyle("/admin/s")}><FaUsers /> Show Register</Link></li>
            <li><Link to="/sroom" style={linkStyle("/admin/sroom")}><FaClipboardList /> Show Room</Link></li>
            <li><Link to="/hroom" style={linkStyle("/admin/hroom")}><FaBed /> Rooms</Link></li>
            <li><Link to="/staff" style={linkStyle("/admin/staff")}><FaUser /> Staff</Link></li>
            <li><Link to="/sstaff" style={linkStyle("/admin/sstaff")}><FaUsers /> Show Staff</Link></li>
            <li><Link to="/sbook" style={linkStyle("/admin/sbook")}><FaClipboardList /> Show Booking</Link></li>
            <li><Link to="/sfeed" style={linkStyle("/admin/sfeed")}><FaComments /> Show Feedback</Link></li>
            <li><Link to="/about" style={linkStyle("/admin/about")}><FaInfoCircle /> About</Link></li>
            <li><Link to="/sabout" style={linkStyle("/admin/sabout")}><FaClipboardList /> Show About</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
