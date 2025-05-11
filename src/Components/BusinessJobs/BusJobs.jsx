import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Applicants from "../../API/Applicants/Applicants";
import "./BusJobs.css";
import Controller from "../Controller/Controller";
const BusJobs = () => {
  useEffect(() => {
    getApplicants();
  }, []);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const companyInfo = {
    name: "Tech Innovators",
    logo: "./src/assets/images/Company.png",
  };

  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-Time",
      location: "Remote",
      postedDate: "2 days ago",
      description:
        "We are looking for a skilled Frontend Developer to join our team...",
      requirements: [
        "Proficiency in HTML, CSS, and JavaScript.",
        "Experience with React or Angular.",
        "Strong problem-solving skills.",
      ],
      responsibilities: [
        "Develop user interface components.",
        "Optimize applications for maximum speed.",
        "Collaborate with backend developers.",
      ],
      benefits: ["Flexible working hours", "Health insurance"],
    },
    {
      id: 2,
      title: "Backend Developer",
      type: "Part-Time",
      location: "Dubai, UAE",
      postedDate: "5 days ago",
      description:
        "We need a Backend Developer to manage our server-side logic...",
      requirements: [
        "Experience with Node.js or Python.",
        "Knowledge of RESTful APIs.",
        "Database management skills.",
      ],
      responsibilities: [
        "Design and implement server-side logic.",
        "Integrate front-end elements into the application.",
        "Ensure high performance and responsiveness.",
      ],
      benefits: ["Competitive salary", "Professional development"],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Contract",
      location: "Cairo, Egypt",
      postedDate: "1 week ago",
      description: "We are seeking a creative UI/UX Designer...",
      requirements: [
        "Proficiency in design tools like Figma or Adobe XD.",
        "Strong portfolio showcasing past projects.",
      ],
      responsibilities: [
        "Create wireframes and prototypes.",
        "Collaborate with developers to implement designs.",
      ],
      benefits: ["Flexible hours", "Creative freedom"],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      type: "Full-Time",
      location: "New York, USA",
      postedDate: "3 days ago",
      description:
        "Join us as a DevOps Engineer to streamline our deployment pipelines...",
      requirements: [
        "Experience with CI/CD pipelines.",
        "Knowledge of Docker and Kubernetes.",
      ],
      responsibilities: [
        "Automate infrastructure provisioning.",
        "Monitor system performance.",
      ],
      benefits: ["Competitive salary", "Stock options"],
    },
    {
      id: 5,
      title: "Data Analyst",
      type: "Full-Time",
      location: "Berlin, Germany",
      postedDate: "4 days ago",
      description:
        "We are hiring a Data Analyst to interpret complex data sets...",
      requirements: [
        "Experience with SQL and data visualization tools.",
        "Strong analytical skills.",
      ],
      responsibilities: [
        "Analyze data to identify trends.",
        "Generate reports for stakeholders.",
      ],
      benefits: ["Health insurance", "Professional growth"],
    },
    {
      id: 6,
      title: "Product Manager",
      type: "Full-Time",
      location: "San Francisco, USA",
      postedDate: "6 days ago",
      description: "We are looking for an experienced Product Manager...",
      requirements: [
        "Experience in product lifecycle management.",
        "Strong communication skills.",
      ],
      responsibilities: [
        "Define product vision and roadmap.",
        "Collaborate with cross-functional teams.",
      ],
      benefits: ["Equity", "Flexible hours"],
    },
    {
      id: 7,
      title: "Mobile App Developer",
      type: "Contract",
      location: "London, UK",
      postedDate: "8 days ago",
      description:
        "We need a Mobile App Developer to build cross-platform apps...",
      requirements: [
        "Experience with React Native or Flutter.",
        "Knowledge of mobile app architecture.",
      ],
      responsibilities: [
        "Develop and maintain mobile applications.",
        "Work closely with designers and testers.",
      ],
      benefits: ["Remote work", "Project-based bonuses"],
    },
    {
      id: 8,
      title: "QA Engineer",
      type: "Part-Time",
      location: "Toronto, Canada",
      postedDate: "10 days ago",
      description: "We are hiring a QA Engineer to ensure product quality...",
      requirements: [
        "Experience with manual and automated testing.",
        "Familiarity with testing frameworks.",
      ],
      responsibilities: [
        "Identify and report bugs.",
        "Write test cases and documentation.",
      ],
      benefits: ["Flexible hours", "Training opportunities"],
    },
  ];

  const [selectedJob, setSelectedJob] = useState(null);

  const handleShowMore = (job) => {
    setSelectedJob(job);
    console.log(job._id);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };
  const userId = localStorage.getItem("user");

  const getApplicants = () => {
    Applicants(setLoading, setError, setApplicants, userId);
  };

  return (
    <div className="company-jobs-page">
      {/* Header Section */}
      <header className="company-header">
        <Controller userId={userId} />

        {/* Company Logo and Name */}
        <div className="company-logo">
          <img src={companyInfo.logo} alt={`${companyInfo.name} Logo`} />
        </div>
        <h1>{companyInfo.name}</h1>
      </header>

      {/* Job Listings Section */}
      <section className="job-listings">
        <h2>Available Jobs</h2>
        <div className="jobs-container">
          {error ? (
            <p>{error}</p>
          ) : loading ? (
            "Loading ..."
          ) : (
            applicants.map((job) => {
              return (
                <div key={job._id} className="job-card">
                  <h3>{job.CompanyName}</h3>
                  <p>
                    <strong>Title:</strong> {job.jobTitle}
                  </p>
                  {/* Show More Button */}
                  <button
                    className="show-more-btn"
                    onClick={() => handleShowMore(job)}
                  >
                    Show More
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedJob && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <button className="close-modal-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedJob.jobTitle}</h2>
            <p>
              <strong>Company:</strong> {selectedJob.CompanyName}
            </p>
            <p>
              <strong>Type:</strong> {selectedJob.jobType.join(", ")}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {`${selectedJob.country}, ${selectedJob.city}, ${selectedJob.area}`}
            </p>
            <p>
              <strong>Salary:</strong> ${selectedJob.salary}
            </p>

            <h3>Job Description</h3>
            <p>{selectedJob.jobDescription}</p>

            <h3>Job Requirements</h3>
            <p>{selectedJob.jobRequirements}</p>

            <h3>Required Skills</h3>
            <ul className="dot-list blue-text">
              {selectedJob.requiredSkills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>

            <h3>Document</h3>
            <p>
              <a
                href={selectedJob.Document}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Document
              </a>
            </p>

            <a href={`/our_applicants/${selectedJob._id}`}>View Applicants</a>
          </div>
        </>
      )}
    </div>
  );
};

export default BusJobs;
