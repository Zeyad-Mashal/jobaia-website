import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./Job.css";
import JobList from "../JobList/JobList";

const Job = () => {
  const [isWorkplaceOpen, setIsWorkplaceOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isCareerLevelOpen, setIsCareerLevelOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [isMinOpen, setIsMinOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isDatePostedOpen, setIsDatePostedOpen] = useState(false);
  const [showMoreCountries, setShowMoreCountries] = useState(false);
  const [showMoreCities, setShowMoreCities] = useState(false);
  const [showMoreAreas, setShowMoreAreas] = useState(false);
  const [showMoreCareerLevels, setShowMoreCareerLevels] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreJobTypes, setShowMoreJobTypes] = useState(false);

  const [filters, setFilters] = useState({
    jobType: [],
    country: [],
    city: [],
    area: [],
    careerLevel: [],
    maxExperience: null,
    minExperience: null,
    category: [],
    datePosted: null,
  });

  const openFilter = () => {
    document.querySelector(".job-sidebar").style.display = "block";
  };

  const closeFilter = () => {
    document.querySelector(".job-sidebar").style.display = "none";
  };

  const updateFilter = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[filterType])) {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (v) => v !== value
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }
      return newFilters;
    });
  };

  const allCountries = [
    "All",
    "Egypt",
    "Saudi Arabia",
    "UAE",
    "Jordan",
    "Lebanon",
    "Iraq",
    "Morocco",
  ];
  const visibleCountries = showMoreCountries
    ? allCountries
    : allCountries.slice(0, 4);

  const allCities = [
    "All",
    "Cairo",
    "Riyadh",
    "Dubai",
    "Amman",
    "Beirut",
    "Baghdad",
    "Casablanca",
    "Alexandria",
    "Jeddah",
    "Sharjah",
  ];
  const visibleCities = showMoreCities ? allCities : allCities.slice(0, 4);

  const allAreas = [
    "All",
    "Downtown",
    "New Cairo",
    "Heliopolis",
    "Nasr City",
    "Zamalek",
    "Mohandessin",
    "Maadi",
    "Sheikh Zayed",
    "6th of October",
    "Al Rehab",
  ];
  const visibleAreas = showMoreAreas ? allAreas : allAreas.slice(0, 4);

  const allCareerLevels = [
    "All",
    "Junior",
    "Mid-Level",
    "Senior",
    "Manager",
    "Director",
    "VP",
    "CXO",
  ];
  const visibleCareerLevels = showMoreCareerLevels
    ? allCareerLevels
    : allCareerLevels.slice(0, 4);

  const maxYears = Array.from({ length: 10 }, (_, i) => i + 1);
  const minYears = Array.from({ length: 10 }, (_, i) => i + 1);

  const allCategories = [
    "All",
    "Software Development",
    "Data Science",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Customer Support",
    "Design",
    "Project Management",
    "Education",
  ];
  const visibleCategories = showMoreCategories
    ? allCategories
    : allCategories.slice(0, 4);

  const allJobTypes = [
    "All",
    "Full-Time",
    "Part-Time",
    "Contract",
    "Freelance",
    "Internship",
  ];
  const visibleJobTypes = showMoreJobTypes
    ? allJobTypes
    : allJobTypes.slice(0, 3);

  return (
    <div className="job-page">
      <div className="search-container">
        <div className="input-with-button">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Jobs..."
            className="search-input"
          />
          <div className="search_btns">
            <button className="search-button">Search</button>
            <button className="filter_tool" onClick={openFilter}>
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="job_container">
        <div className="job-sidebar">
          <IoMdClose className="close_icon" onClick={closeFilter} />
          <h3>Filters</h3>
          <p style={{ fontSize: "14px", color: "#666" }}>
            {
              Object.values(filters)
                .flat()
                .filter((v) => v && v !== "All").length
            }{" "}
            filters selected
          </p>
          <hr />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsWorkplaceOpen(!isWorkplaceOpen)}
            >
              <h4>Workplace</h4>
              {isWorkplaceOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isWorkplaceOpen && (
              <div className="accordion-body">
                <label>
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes("Hybrid")}
                    onChange={() => updateFilter("jobType", "Hybrid")}
                  />
                  Hybrid
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes("Onsite")}
                    onChange={() => updateFilter("jobType", "Onsite")}
                  />
                  Onsite
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={filters.jobType.includes("Remote")}
                    onChange={() => updateFilter("jobType", "Remote")}
                  />
                  Remote
                </label>
              </div>
            )}
          </div>
          <hr className="section-divider" />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
            >
              <h4>Country</h4>
              {isCountryOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isCountryOpen && (
              <div className="accordion-body">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="country-search no-radius"
                />
                <br />

                {visibleCountries.map((country, index) => (
                  <label key={index} className="country-option">
                    <input
                      type="checkbox"
                      checked={filters.country.includes(country)}
                      onChange={() => updateFilter("country", country)}
                    />
                    {country}
                    <br />
                  </label>
                ))}

                <div className="show-more-less">
                  {!showMoreCountries ? (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCountries(true);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCountries(false);
                      }}
                    >
                      Show Less
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />
          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsCityOpen(!isCityOpen)}
            >
              <h4>City</h4>
              {isCityOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isCityOpen && (
              <div className="accordion-body">
                <input
                  type="text"
                  placeholder="Search cities..."
                  className="country-search no-radius"
                />
                <br />

                {visibleCities.map((city, index) => (
                  <label key={index} className="country-option">
                    <input
                      type="checkbox"
                      checked={filters.city.includes(city)}
                      onChange={() => updateFilter("city", city)}
                    />
                    {city}
                    <br />
                  </label>
                ))}

                <div className="show-more-less">
                  {!showMoreCities ? (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCities(true);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCities(false);
                      }}
                    >
                      Show Less
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsAreaOpen(!isAreaOpen)}
            >
              <h4>Area</h4>
              {isAreaOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isAreaOpen && (
              <div className="accordion-body">
                <input
                  type="text"
                  placeholder="Search areas..."
                  className="country-search no-radius"
                />
                <br />

                {visibleAreas.map((area, index) => (
                  <label key={index} className="country-option">
                    <input
                      type="checkbox"
                      checked={filters.area.includes(area)}
                      onChange={() => updateFilter("area", area)}
                    />
                    {area}
                    <br />
                  </label>
                ))}

                <div className="show-more-less">
                  {!showMoreAreas ? (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreAreas(true);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreAreas(false);
                      }}
                    >
                      Show Less
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsCareerLevelOpen(!isCareerLevelOpen)}
            >
              <h4>Career Levels</h4>
              {isCareerLevelOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isCareerLevelOpen && (
              <div className="accordion-body">
                <input
                  type="text"
                  placeholder="Search career levels..."
                  className="country-search no-radius"
                />
                <br />

                {visibleCareerLevels.map((level, index) => (
                  <label key={index} className="country-option">
                    <input
                      type="checkbox"
                      checked={filters.careerLevel.includes(level)}
                      onChange={() => updateFilter("careerLevel", level)}
                    />
                    {level}
                    <br />
                  </label>
                ))}

                <div className="show-more-less">
                  {!showMoreCareerLevels ? (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCareerLevels(true);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCareerLevels(false);
                      }}
                    >
                      Show Less
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsExperienceOpen(!isExperienceOpen)}
            >
              <h4>Years of Experience</h4>
              {isExperienceOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isExperienceOpen && (
              <div className="accordion-body">
                <div className="sub-accordions-container">
                  <div className="sub-accordion">
                    <div
                      className="sub-accordion-header"
                      onClick={() => setIsMaxOpen(!isMaxOpen)}
                    >
                      <h5>Max</h5>
                      {isMaxOpen ? (
                        <FaChevronUp className="accordion-arrow" />
                      ) : (
                        <FaChevronDown className="accordion-arrow" />
                      )}
                    </div>
                    {isMaxOpen && (
                      <div className="dropdown-menu">
                        {maxYears.map((year, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => updateFilter("maxExperience", year)}
                          >
                            {year} years
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="sub-accordion">
                    <div
                      className="sub-accordion-header"
                      onClick={() => setIsMinOpen(!isMinOpen)}
                    >
                      <h5>Min</h5>
                      {isMinOpen ? (
                        <FaChevronUp className="accordion-arrow" />
                      ) : (
                        <FaChevronDown className="accordion-arrow" />
                      )}
                    </div>
                    {isMinOpen && (
                      <div className="dropdown-menu">
                        {minYears.map((year, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => updateFilter("minExperience", year)}
                          >
                            {year} years
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />
          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <h4>Job Category</h4>
              {isCategoryOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isCategoryOpen && (
              <div className="accordion-body">
                <input
                  type="text"
                  placeholder="Search job categories..."
                  className="country-search no-radius"
                />
                <br />

                {visibleCategories.map((category, index) => (
                  <label key={index} className="country-option">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={() => updateFilter("category", category)}
                    />
                    {category}
                    <br />
                  </label>
                ))}

                <div className="show-more-less">
                  {!showMoreCategories ? (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCategories(true);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreCategories(false);
                      }}
                    >
                      Show Less
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
            >
              <h4>Job Type</h4>
              {isJobTypeOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isJobTypeOpen && (
              <div className="accordion-body">
                <input
                  type="text"
                  placeholder="Search job types..."
                  className="country-search no-radius"
                />
                <br />

                {visibleJobTypes.map((type, index) => (
                  <label key={index} className="country-option">
                    <input
                      type="checkbox"
                      checked={filters.jobType.includes(type)}
                      onChange={() => updateFilter("jobType", type)}
                    />
                    {type}
                    <br />
                  </label>
                ))}

                <div className="show-more-less">
                  {!showMoreJobTypes ? (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreJobTypes(true);
                      }}
                    >
                      Show More
                    </span>
                  ) : (
                    <span
                      className="show-more-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreJobTypes(false);
                      }}
                    >
                      Show Less
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="section-divider" />

          <div className="filter-section">
            <div
              className="accordion-header"
              onClick={() => setIsDatePostedOpen(!isDatePostedOpen)}
            >
              <h4>Date Posted</h4>
              {isDatePostedOpen ? (
                <FaChevronUp className="accordion-arrow" />
              ) : (
                <FaChevronDown className="accordion-arrow" />
              )}
            </div>
            {isDatePostedOpen && (
              <div className="accordion-body">
                <label>
                  <input
                    type="checkbox"
                    checked={filters.datePosted === "All"}
                    onChange={() => updateFilter("datePosted", "All")}
                  />
                  All
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={filters.datePosted === "Last 24 Hours"}
                    onChange={() => updateFilter("datePosted", "Last 24 Hours")}
                  />
                  Last 24 Hours
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={filters.datePosted === "Last Week"}
                    onChange={() => updateFilter("datePosted", "Last Week")}
                  />
                  Last Week
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={filters.datePosted === "Last Month"}
                    onChange={() => updateFilter("datePosted", "Last Month")}
                  />
                  Last Month
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="main-content">
          <JobList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Job;
