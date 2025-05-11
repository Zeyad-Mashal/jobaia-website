import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./OurApplicants.css";
import GetApplicantsFromJob from "../../API/Applicants/GetApplicantsFromJob";
const OurApplicants = () => {
  const id = useParams();
  console.log(id.id);

  const [getApplicantsFromJob, setGetApplicantsFromJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    getAllApplicants();
  }, []);

  const getAllApplicants = () => {
    GetApplicantsFromJob(setLoading, setError, setGetApplicantsFromJob, id.id);
  };

  const handleViewMore = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
  };

  const companyInfo = {
    name: "Tech Innovators",
    logo: "./src/assets/images/Company.png",
  };

  return (
    <div className="our-applicants-page">
      {/* Controller */}
      <header className="company-header">
        <nav className="controller">
          <Link to="/business-profile" className="controller-btn">
            General Info
          </Link>
          <button className="controller-btn active">Our Applicants</button>
          <button className="controller-btn">Feedback</button>
          <Link to="/create_job" className="controller-btn">
            Post Jobs
          </Link>
          <Link to="/business-jobs" className="controller-btn">
            All Jobs
          </Link>
        </nav>

        <div className="company-logo">
          <img src={companyInfo.logo} alt={`${companyInfo.name} Logo`} />
        </div>
        <h1>{companyInfo.name}</h1>
      </header>

      {/* Main Content */}
      <section className="applicants-section">
        <h2>Our Applicants</h2>
        <div className="applicants-container">
          {error ? (
            <p>{error}</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : getApplicantsFromJob.length === 0 ? (
            <p>No Applicants found.</p>
          ) : (
            getApplicantsFromJob.map((applicant) => (
              <div key={applicant._id} className="applicant-card">
                <h3>
                  {applicant.firstName} {applicant.lastName}
                </h3>
                <p>
                  <strong>Phone:</strong> {applicant.phoneNabmer}
                </p>
                <p>
                  <strong>Applied for:</strong> {applicant.jobNeeded}
                </p>
                <button
                  className="view-more-btn"
                  onClick={() => handleViewMore(applicant)}
                >
                  View More
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedApplicant && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <button className="close-modal-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>
              {selectedApplicant.firstName} {selectedApplicant.lastName}
            </h2>
            <p>
              <strong>Phone:</strong> {selectedApplicant.phoneNabmer}
            </p>
            <p>
              <strong>Alternate Number:</strong>{" "}
              {selectedApplicant.alternateNumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedApplicant.mandatoryAddress},{" "}
              {selectedApplicant.city}, {selectedApplicant.state},{" "}
              {selectedApplicant.zipCode}
            </p>
            <p>
              <strong>Applied for:</strong> {selectedApplicant.jobNeeded}{" "}
              {selectedApplicant.otherJob && `(${selectedApplicant.otherJob})`}
            </p>
            <p>
              <strong>Working Period:</strong> {selectedApplicant.WorkingPeriod}{" "}
              years
            </p>
            <p>
              <strong>Worked with us before:</strong>{" "}
              {selectedApplicant.workedUs === "1" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              <a href={selectedApplicant.CV} target="_blank" rel="noreferrer">
                View CV
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OurApplicants;
