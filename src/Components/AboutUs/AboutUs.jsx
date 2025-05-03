import React from "react";
import { FaBriefcase, FaUser } from "react-icons/fa";
import videoSource from "../../assets/images/about.mp4";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="container">
      {/* Header Section */}

      <div className="header-section">
        <h2>About Us</h2>
        <h1>WELCOME TO JOBAIA !</h1>
      </div>

      {/* About Card (Video + Description) */}

      <div className="about-card">
        <div className="video-container">
          <video src={videoSource} autoPlay loop muted />
        </div>
        <div className="text-container">
          <h2 className="section-title">Who Are We?</h2>
          <p>
            Our platform connects businesses with skilled job seekers looking
            for short-term opportunities. Whether you need a temporary workforce
            or you're searching for flexible job options, we provide the perfect
            space for both sides to connect efficiently.
          </p>
        </div>
      </div>

      {/* Business & Job Seekers Cards */}
      <div className="cards-section">
        <div className="card">
          <FaBriefcase className="icon" />
          <h2>For Businesses</h2>
          <p>Find skilled professionals for your short-term hiring needs.</p>
          <button className="join-btn">Join Us</button>
        </div>

        <div className="card">
          <FaUser className="icon" />
          <h2>For Job Seekers</h2>
          <p>Discover flexible job opportunities that match your skills.</p>
          <button className="join-btn">Join Us</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
