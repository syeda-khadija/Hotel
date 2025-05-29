// ADMIN/Adminnavbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Adminnavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? 'white' : 'gray',
    fontWeight: isActive(path) ? 'bold' : 'normal',
  });
  

  return (
    <div>
  
    <nav style={{
      backgroundColor: '#000',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #444',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '22px', color: 'white' }}>
        Admin Panel
      </div>
    
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        <li><Link to="/s" style={linkStyle("/admin/s")}>Show Register</Link></li>
        <li><Link to="/sroom" style={linkStyle("/admin/s")}>Show room</Link></li>
        <li><Link to="/hroom" style={linkStyle("/admin/hroom")}>Rooms</Link></li>
        <li><Link to="/staff" style={linkStyle("/admin/staff")}>Staff</Link></li>
        <li><Link to="/sstaff" style={linkStyle("/admin/sstaff")}>Showstaff </Link></li>
        <li><Link to="/sbook" style={linkStyle("/admin/sstaff")}>Showbooking </Link></li>
        <li><Link to="/sfeed" style={linkStyle("/admin/sfeed")}>ShowFeedback</Link></li>
      </ul>

      <Link to="/login">
        <button type="button" className="btn btn-outline-danger">
          login
        </button>
      </Link>
    </nav>
    </div>
  );
}

