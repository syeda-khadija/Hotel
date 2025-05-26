import React from 'react'
import { Link ,useLocation} from 'react-router-dom'

export default function Navbar(){

  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700';
  return (
   
  <div>
   <nav style={{
    backgroundColor:'black',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #ccc'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px' ,color:'white'}}>HotelAdmin</div>

      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0 }}>
        <li >
          <Link to="/" className='nav-link' style={{ textDecoration: 'none', color: isActive('/Home') ? 'white' : 'pink' }}>
            Home 
          </Link>
        </li>
        <li>
          <Link to="/r" className='nav-link' style={{ textDecoration: 'none', color: isActive('/Room') ? 'white' : 'darkgrey' }}>
          Room
          </Link>
        </li>
        <li>
          <Link to="/a" className='nav-link' style={{ textDecoration: 'none', color: isActive('/About') ? 'white' : 'darkgrey' }}>
            About
          </Link>
        </li>
        <li>
          <Link to="/c" className='nav-link' style={{ textDecoration: 'none', color: isActive('/Contact') ? 'white' : 'darkgrey' }}>
            Contact
          </Link>
        </li>
      </ul>
<Link
className="nav-link" //   activeClassName="active_class"
  to="/reg">
   <button type="button" className="btn btn-outline-danger"> Sign up </button>
 </Link>



    </nav>
    </div>

  );
};
