import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'
import Footer from './Footer';


export default function Home() {
  return (
    <div>
      <Navbar/>
        <section class="banner_main">
         <div id="myCarousel" class="carousel slide banner" data-ride="carousel">
            <ol class="carousel-indicators">
               <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
               <li data-target="#myCarousel" data-slide-to="1"></li>
               <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
               <div class="carousel-item active">
                  <img class="first-slide" src="./images/banner1.jpg" alt="First slide"/>
                  <div class="container">
                  </div>
               </div>
               <div class="carousel-item">
                  <img class="second-slide" src="./images/banner2.jpg" alt="Second slide"/>
               </div>
               <div class="carousel-item">
                  <img class="third-slide" src="./images/banner3.jpg" alt="Third slide"/>
               </div>
            </div>
            <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
         </div>
       
         <div className="carousel-caption-overlay">
  <div className="caption-background">
  <h1 className="fade-in-title text-white">Welcome to Hotel Legend</h1>
  <h6 className="fade text-white">Luxurious Rooms</h6>
    <div class="col-md-12">
    <Link className="nav-link" //   activeClassName="active_class"
      to="/book"><button type="button" className="book_btn"> Book Now</button>
       </Link></div>
  </div>
</div>
      </section>
      <Footer/></div>
  );
}
