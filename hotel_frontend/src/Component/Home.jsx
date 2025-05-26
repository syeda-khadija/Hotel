import React from 'react';

export default function Home() {
  return (
    <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <img
              src="https://fruitbasket.limepack.com/blog/wp-content/uploads/2024/04/stunning-view-of-hotel-emirates.jpg"
              className="d-block w-100"
              alt="..."
              style={{ height: '800px', objectFit: 'cover' }}
            />
            <div className="carousel-caption-overlay">
  <div className="caption-background">
    <h1 className="fade-in-title">Welcome to Hotel Legend</h1>
    <h6 className="fade">Luxurious Rooms</h6>
    <p className="fade">Deluxe rooms starting at Rs. 5000/=</p>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
