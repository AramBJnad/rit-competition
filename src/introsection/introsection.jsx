import React from 'react';
import './introsection.css' 

const introsection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content-wrapper">
        <div className="hero-text-block">
          <h1>
            Creating Hope, Changing Lives
          </h1>
          <p>
            Together we can make a difference in the lives of those who need it most.
            <br />
            Join us in our mission to build a better tomorrow.
          </p>
          <div className="hero-cta-buttons">
            <button className="donate-btn-main">Donate Now</button>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>

        <div className="scroll-indicator">
          <p>Scroll to explore</p>
          <span className="scroll-arrow">⬇️</span>
        </div>
      </div>
    </div>
  );
};

export default introsection;