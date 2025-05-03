import React, { useEffect, useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import image1 from "../../assets/images/header.jpeg";
import image2 from "../../assets/images/counters-bg.jpg";
import image3 from "../../assets/images/work-3.jpg";
import "./MainSection.css";
import { Link, useNavigate } from "react-router-dom";

const MainSection = () => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = async (key) => {
    if (!key.trim()) {
      setResults([]);
      setMessage("");
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    setMessage("");

    localStorage.getItem("value");

    // localStorage.setItem("searchValue", searchKey);

    try {
      const res = await fetch(`https://jobaia-green.vercel.app/search/${key}`);
      const data = await res.json();

      if (data.apiStatus) {
        setResults(data.data);
        setMessage(data.message);
        setShowDropdown(true);
      } else {
        setResults([]);
        setMessage("No jobs found.");
        setShowDropdown(false);
      }
    } catch (error) {
      setMessage("Something went wrong!");
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      fetchJobs(searchKey);
    }, 500);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [searchKey]);

  const slideImages = [
    { url: image1, caption: "Caption 1" },
    { url: image2 },
    { url: image3 },
  ];

  const handleSearch = async () => {
    if (!searchKey.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://jobaia-green.vercel.app/search/${searchKey}`
      );
      const data = await res.json();

      if (data.apiStatus) {
        localStorage.setItem("searchKey", searchKey);
        setResults(data.data);
        setMessage(data.message);
        navigate("/jobs");
      } else {
        setResults([]);
        setMessage("No jobs found.");
      }
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="slide-container">
      <Fade arrows={false} duration={5000}>
        {slideImages.map((fadeImage, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              style={{ width: "100%", height: "100%" }}
              src={fadeImage.url}
              className="object-cover brightness-75"
            />
            <div className="text-white space-y-4 absolute inset-0 flex flex-col items-center justify-center p-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center">
                Find the Best Jobs in Egypt
              </h1>
              <p className="text-sm md:text-lg text-center">
                Searching for vacancies & career opportunities? WUZZUF helps you
                in your job search in Egypt
              </p>
              <div className="flex flex-col items-center bg-white rounded-lg p-3 w-full md:w-1/2 relative">
                <div className="flex flex-row items-center w-full">
                  <i className="text-blue-700 fa-solid fa-magnifying-glass"></i>
                  <input
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    type="text"
                    placeholder="Search Jobs (e.g. Senior PHP developer)"
                    className=" flex-grow px-4 py-2 border-none text-gray-700 focus:ring-0 w-full md:w-auto"
                  />
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-200">
                    {loading ? (
                      <div className="p-4 text-center text-gray-700">
                        <div className="animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded"></div>
                              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : results.length > 0 ? (
                      <ul>
                        {results.map((job, index) => (
                          <li
                            key={index}
                            className="border-b border-gray-100 last:border-b-0 transition-colors duration-200 hover:bg-blue-50"
                          >
                            <Link
                              to={`/jobsDetails/${job._id}`}
                              className="block px-4 py-3 text-gray-800 hover:text-blue-600"
                              onClick={() => setShowDropdown(false)}
                            >
                              <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors duration-200">
                                {job.jobTitle}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 hover:text-blue-500 transition-colors duration-200">
                                {job.CompanyName}
                              </p>
                              <div className="flex items-center mt-2 space-x-3">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200">
                                  {job.area}
                                </span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200 ">
                                  {job.salary}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-gray-700">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default MainSection;
