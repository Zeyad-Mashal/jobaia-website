import React, { useState, useEffect } from "react";
import "./JobList.css";
import { Link } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    const searchKey = localStorage.getItem("searchKey");

    if (searchKey) {
      searchJobs(searchKey);
      setIsSearchMode(true);
    } else {
      JoblistApi(currentPage);
    }
  }, []); // فارغ يعني يتنفذ مره واحدة فقط

  useEffect(() => {
    if (!isSearchMode) {
      JoblistApi(currentPage);
    }
  }, [currentPage]);

  const JoblistApi = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jobaia-green.vercel.app/JobPosting/paginated?page=${page}`
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch jobs");
      }

      setJobs(data.data);
      setPagination(data.pagination);
      setError("");
    } catch (err) {
      setError(err.message);
      setJobs([]);
      setPagination(null);
    }
    setLoading(false);
  };

  const searchJobs = async (key) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jobaia-green.vercel.app/search/${key}`
      );
      const data = await response.json();

      setJobs(data.data);
      setError("");
    } catch (err) {
      setError(err.message);
      setJobs([]);
    }
    setLoading(false);
  };

  const nextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="job_list">
      <h1>Available Jobs</h1>
      <div className="job_list_container">
        {loading ? (
          <div className="loading_api">
            <span className="loaderApi"></span>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="job_card">
              <div className="job_header">
                <div>
                  <h2>{job.jobTitle}</h2>
                  <p className="company_name">{job.CompanyName}</p>
                </div>
                <BsBuildingsFill />
              </div>

              <div className="job_location">
                <p>
                  <strong>Location:</strong>{" "}
                  {`${job.city}, ${job.area}, ${job.country}`}
                </p>
              </div>

              <div className="job_details">
                <p>
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>
              </div>

              <div className="job_skills">
                <strong>Required Skills:</strong>
                <ul>
                  {job.requiredSkills.map((skill, idx) => (
                    <li key={idx}>{skill},</li>
                  ))}
                </ul>
              </div>

              <button className="apply_button">
                <Link to={`/jobsDetails/${job._id}`}>Apply Now</Link>
              </button>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {/* Pagination */}
      {!isSearchMode && pagination && (
        <div className="pagination">
          <button onClick={prevPage} disabled={!pagination.hasPrevPage}>
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button onClick={nextPage} disabled={!pagination.hasNextPage}>
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default JobList;
