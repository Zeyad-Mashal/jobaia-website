import React from 'react';
import { Link } from 'react-router-dom';

const Controller = () => {
  return (
    <nav className="controller fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4 py-2">
        <Link to="/business-profile" className="controller-btn">General Info</Link>
        <button className="controller-btn">Our Applicants</button>
        <button className="controller-btn">Feedback</button>
        <button className="controller-btn">Post Jobs</button>
        <Link to="/business-jobs" className="controller-btn">All Jobs</Link>
      </div>
    </nav>
  );
};

export default Controller;