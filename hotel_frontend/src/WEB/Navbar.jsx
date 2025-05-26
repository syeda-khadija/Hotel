import React from 'react'
import { Link ,useLocation} from 'react-router-dom'

export default function Navbar(){
  return (
   <div>
   
        <div class="header">
            <div class="container">
               <div class="row">
                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                     <div class="full">
                        <div class="center-desk">
                           <div class="logo">
                              <Link to="/"><img src="./images/logo.png" alt="#" /></Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                     <nav class="navigation navbar navbar-expand-md navbar-dark ">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarsExample04">
                           <ul class="navbar-nav mr-auto">
                              <li class="nav-item active">
                                 <Link class="nav-link" to="/">Home</Link>
                              </li>
                              <li class="nav-item">
                                 <Link class="nav-link" to="/a">About</Link>
                              </li>
                              <li class="nav-item">
                                 <Link class="nav-link" to="/r">Our room</Link>
                              </li>
                              <li class="nav-item">
                                 <Link class="nav-link" to="/c">Contact Us</Link>
                              </li>
                              <Link className="nav-link" //   activeClassName="active_class"
                                 to="/reg"><button type="button" className="btn btn-outline-danger"> Sign up </button>
                               </Link>
                           </ul>
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
    </div>

  );
};
