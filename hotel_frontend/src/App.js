import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './WEB/Home';
import About from './WEB/About';
import Contact from './WEB/Contact';
import Register from './WEB/Register';
import Showdata from './ADMIN/Showdata';
import Login from './WEB/Login';
import Forgotpassword from './WEB/Forgotpassword';
import Booking from './WEB/Booking';
import Room from './WEB/Room';
import Hotelroom from './ADMIN/Hotelroom';
import Showroom from './ADMIN/Showroom';
import Footer from './WEB/Footer';
import Staff from './ADMIN/Staff';
import Showstaff from './ADMIN/Showstaff';
import ShowBookings from './ADMIN/Showbooking';
import Resetpassword from './WEB/Resetpassword';

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">


  <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='r' element={<Room />} />
          <Route path='a' element={<About />} />
          <Route path='c' element={<Contact />} />
          <Route path='reg' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/fp' element={<Forgotpassword />} />
          <Route path='/reset' element={<Resetpassword />} />
          <Route path='/book' element={<Booking/>} />
          <Route path='/footer' element={<Footer/>} />


          {/* Admin Routes with Admin Layout */}
          
        </Routes>


        <Routes>
           
            <Route path='/s' element={<Showdata />} />
            <Route path='/hroom' element={<Hotelroom/>} />
            <Route path='/sroom' element={<Showroom/>} />
            <Route path='/staff' element={<Staff/>} />
            <Route path='/sstaff' element={<Showstaff/>} />
            <Route path='/sbook' element={<ShowBookings/>} />


          
        </Routes>
  
    </div>
    </BrowserRouter>
  );
}

export default App;
