import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./JobDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const JobDetails = () => {
  const userId = localStorage.getItem("user");

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const featuredJobs = [
    {
      title: "Senior Accountant",
      company: "Metco",
      location: "Zamalek, Cairo",
      timeAgo: "4 hours ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
    {
      title: "Cost Accountant",
      company: "Farouk Systems Egypt",
      location: "6th of October, Giza",
      timeAgo: "29 days ago",
      logo: null,
    },
  ];

  const defaultLogo = "https://cdn-icons-png.flaticon.com/512/4091/4091450.png";

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://jobaia-green.vercel.app/jobDetails/${id}`
        );
        setJob(response.data);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false); // 👈 turn off loading
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="loading_api">
        <span class="loaderApi"></span>
      </div>
    );
  }

  return (
    <div className="job-page-container">
      <div className="job-header-box">
        <div className="job-header">
          <h1 className="job-title">{job.jobTitle}</h1>
          <div className="employment-tags">
            {job.jobType.map((type, index) => {
              return (
                <span className="tag" key={index}>
                  {type.trim()}
                </span>
              );
            })}
          </div>
          <p className="company-location">
            <strong>{job.CompanyName}</strong>- {job.country}
          </p>
          {/* <p className="posted-date">{job.postedDate}</p> */}
          <button className="apply-button">
            <Link to={`/jobApp/${userId}/${id}`}>Apply Now</Link>
          </button>
        </div>

        <div className="company-logo">
          {/* <img
            src={job.company.logo ? job.company.logo : defaultLogo}
            alt="Company Logo"
          /> */}
        </div>
      </div>

      {/* Job Details Section */}
      <div className="job-details-container">
        <h2>Job Details</h2>
        <p>
          <FaCheckCircle className="icon success" />{" "}
          <strong>Experience Needed:</strong>{" "}
        </p>
        <pre className="job-pre">{job.jobDescription}</pre>

        <p>
          <FaExclamationCircle className="icon warning" />{" "}
          <strong>Career Level:</strong>{" "}
        </p>
        <pre className="job-pre">{job.jobRequirements}</pre>

        <p>
          <FaExclamationCircle className="icon warning" />{" "}
          <strong>Salary:</strong> {job.salary}
        </p>

        <div className="skills-section">
          <h2>Skills And Tools</h2>
          <div className="skills-container">
            {job.requiredSkills.map((skill, index) => (
              <span className="tag" key={index}>
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="job-section">
        <h2>Job Description</h2>
        <pre className="job-pre">{job.jobDescription}</pre>
      </div>

      {/* Job Requirements */}
      <div className="job-section">
        <h2>Job Requirements</h2>
        <pre className="job-pre">{job.jobRequirements}</pre>
      </div>

      {/* Featured Jobs */}
      <div className="featured-jobs-box">
        <h2>Featured Jobs</h2>
        <div className="featured-jobs-container">
          {featuredJobs.map((job, index) => (
            <div key={index} className="featured-job-card">
              <div className="job-logo">
                <img
                  src={job.logo ? job.logo : defaultLogo}
                  alt="Company Logo"
                />
              </div>
              <div className="job-info">
                <h3 className="job-title">{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <span className="time-ago">{job.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
