import React, { useState, useEffect } from "react";
import "./JobList.css";
import { Link } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";
const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const jobsPerPage = 10;

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    filterJobsLocally(allJobs, filters, currentPage);
  }, [filters, allJobs]);

  const fetchJobs = async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://jobaia-green.vercel.app/JobPosting/paginated?page=${page}`
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch jobs");
      }

      setAllJobs(data.data || []);

      filterJobsLocally(data.data || [], filters, page);

      setPagination(data.pagination || null);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Something went wrong while fetching jobs");
      setAllJobs([]);
      setJobs([]);
      setPagination(null);
    }
    setLoading(false);
  };

  const extractExperience = (requirements) => {
    if (!requirements) return null;
    const match = requirements.match(/(\d+)\+?\s*years/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const filterJobsLocally = (jobsData, filters, page) => {
    try {
      let filteredJobs = [...jobsData];

      if (filters.jobType?.length > 0 && !filters.jobType.includes("All")) {
        filteredJobs = filteredJobs.filter((job) =>
          job.jobType?.some((type) => filters.jobType.includes(type))
        );
      }

      if (filters.country?.length > 0 && !filters.country.includes("All")) {
        filteredJobs = filteredJobs.filter((job) =>
          filters.country.includes(job.country)
        );
      }

      if (filters.city?.length > 0 && !filters.city.includes("All")) {
        filteredJobs = filteredJobs.filter((job) =>
          filters.city.includes(job.city)
        );
      }

      if (filters.area?.length > 0 && !filters.area.includes("All")) {
        filteredJobs = filteredJobs.filter((job) =>
          filters.area.includes(job.area)
        );
      }

      if (
        filters.careerLevel?.length > 0 &&
        !filters.careerLevel.includes("All")
      ) {
        filteredJobs = filteredJobs.filter((job) => {
          const requirements = job.jobRequirements?.toLowerCase() || "";
          return filters.careerLevel.some((level) =>
            requirements.includes(level.toLowerCase())
          );
        });
      }

      if (filters.maxExperience || filters.minExperience) {
        filteredJobs = filteredJobs.filter((job) => {
          const experience = extractExperience(job.jobRequirements);
          if (!experience) return false;
          const maxCheck = filters.maxExperience
            ? experience <= filters.maxExperience
            : true;
          const minCheck = filters.minExperience
            ? experience >= filters.minExperience
            : true;
          return maxCheck && minCheck;
        });
      }

      if (filters.category?.length > 0 && !filters.category.includes("All")) {
        filteredJobs = filteredJobs.filter((job) => {
          const title = job.jobTitle?.toLowerCase() || "";
          const description = job.jobDescription?.toLowerCase() || "";
          return filters.category.some(
            (cat) =>
              title.includes(cat.toLowerCase()) ||
              description.includes(cat.toLowerCase())
          );
        });
      }

      if (filters.datePosted && filters.datePosted !== "All") {
        filteredJobs = filteredJobs.filter((job) => {
          const jobDate = new Date(job.createdAt);
          if (isNaN(jobDate)) return false;
          const now = new Date();
          if (filters.datePosted === "Last 24 Hours") {
            return now - jobDate <= 24 * 60 * 60 * 1000;
          }
          if (filters.datePosted === "Last Week") {
            return now - jobDate <= 7 * 24 * 60 * 60 * 1000;
          }
          if (filters.datePosted === "Last Month") {
            return now - jobDate <= 30 * 24 * 60 * 60 * 1000;
          }
          return true;
        });
      }

      const totalJobs = filteredJobs.length;
      const totalPages = Math.ceil(totalJobs / jobsPerPage);
      const startIndex = (page - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      setJobs(paginatedJobs);
      setPagination({
        currentPage: page,
        totalPages,
        totalJobs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      });
      setError("");
    } catch (err) {
      console.error("Filter Error:", err);
      setError("Something went wrong while filtering jobs");
      setJobs([]);
      setPagination(null);
    }
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
      {error && <div className="error_message">{error}</div>}
      <div className="job_list_container">
        {loading ? (
          <div className="loading_api">
            <span className="loaderApi"></span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="no_jobs">
            No jobs found matching the selected filters.
          </div>
        ) : (
          jobs.map((job, index) => (
            <div key={job._id || index} className="job_card">
              <div className="job_header">
                <div>
                  <h2>{job.jobTitle || "Untitled Job"}</h2>
                  <p className="company_name">
                    {job.CompanyName || "Unknown Company"}
                  </p>
                </div>
                <BsBuildingsFill />
              </div>
              <div className="job_location">
                <p>
                  <strong>Location:</strong>{" "}
                  {job.city && job.area && job.country
                    ? `${job.city}, ${job.area}, ${job.country}`
                    : "Location not specified"}
                </p>
              </div>
              <div className="job_details">
                <p>
                  <strong>Type:</strong>{" "}
                  {Array.isArray(job.jobType)
                    ? job.jobType.join(", ")
                    : job.jobType || "Not specified"}
                </p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {job.salary ? `$${job.salary}` : "Not specified"}
                </p>
              </div>
              <div className="job_skills">
                <strong>Required Skills:</strong>
                <ul>
                  {Array.isArray(job.requiredSkills) &&
                  job.requiredSkills.length > 0 ? (
                    job.requiredSkills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))
                  ) : (
                    <li>None specified</li>
                  )}
                </ul>
              </div>
              <button className="apply_button">
                <Link to={`/jobsDetails/${job._id || ""}`}>Apply Now</Link>
              </button>
            </div>
          ))
        )}
      </div>

      {pagination && (
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
