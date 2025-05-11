import React, { useState } from "react";
import "./JobPosting.css";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import Controller from "../Controller/Controller";
const JobPostingForm = () => {
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState([]);
  const [location, setLocation] = useState({ country: "", city: "", area: "" });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [salary, setSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [document, setDocument] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Freelance / Project",
    "Shift Based",
    "Work From Home",
    "Volunteering",
  ];

  const handleJobTypeClick = (type) => {
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async () => {
    const payload = {
      CompanyName: companyName,
      jobTitle,
      jobType,
      country: location.country,
      city: location.city,
      area: location.area,
      salary,
      jobDescription,
      jobRequirements,
      requiredSkills: skills,
      Document: document,
    };
    try {
      const response = await fetch(
        `https://jobaia-green.vercel.app/JobPosting/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOpenModal(true);
        console.log(data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Controller userId={userId} />
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <FaCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-600 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Job posted successfully!
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Ok"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <div className="job-form">
        <h2>Job Posting</h2>

        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
        />

        <label>Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
        />

        <label>Job Type</label>
        <div className="job-type-options">
          {jobTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={jobType.includes(type) ? "selected" : ""}
              onClick={() => handleJobTypeClick(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="location-section">
          <div className="location-group">
            <label>Country</label>
            <select
              value={location.country}
              onChange={(e) =>
                setLocation({ ...location, country: e.target.value })
              }
            >
              <option value="">Select Country</option>
              <option value="Egypt">Egypt</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="location-group">
            <label>City</label>
            <select
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              <option value="Cairo">Cairo</option>
              <option value="New York">New York</option>
            </select>
          </div>
          <div className="location-group">
            <label>Area</label>
            <select
              value={location.area}
              onChange={(e) =>
                setLocation({ ...location, area: e.target.value })
              }
            >
              <option value="">Select Area</option>
              <option value="Maadi">Maadi</option>
              <option value="Brooklyn">Brooklyn</option>
            </select>
          </div>
        </div>

        <label>Salary</label>
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label>Job Description</label>
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <label>Job Requirements</label>
        <textarea
          name="requirements"
          placeholder="Job Requirements"
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
        ></textarea>

        <label>Required Skills</label>
        <div className="skills-input">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Enter skill"
          />
          <button type="button" onClick={handleSkillAdd}>
            Add
          </button>
        </div>
        <div className="skills-container">
          {skills.map((skill) => (
            <div key={skill} className="skill-box">
              {skill} <span onClick={() => handleSkillRemove(skill)}>✖</span>
            </div>
          ))}
        </div>

        <label>Company Logo (Optional)</label>
        <input
          type="text"
          placeholder="Enter logo URL or document link"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />

        <button type="button" className="submitBtn" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </>
  );
};

export default JobPostingForm;
