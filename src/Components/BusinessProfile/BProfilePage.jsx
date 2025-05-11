import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

// ===== EditableField Component =====
const EditableField = ({ label, placeholder, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || "");
  const handleBlur = () => {
    setEditing(false);
    onChange(localValue);
  };
  return (
    <div className="mb-2">
      {editing ? (
        <input
          className="form-input p-2 border rounded-md"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setEditing(true)}
        >
          {value ? value : `+ ${label}`}
        </span>
      )}
    </div>
  );
};

// ===== EditableTags Component =====
const EditableTags = ({ title, label, placeholder }) => {
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([
    { label: "JavaScript", value: "JavaScript" },
    { label: "React", value: "React" },
    { label: "Node.js", value: "Node.js" },
    { label: "CSS", value: "CSS" },
    { label: "HTML", value: "HTML" },
    { label: "Python", value: "Python" },
    { label: "Ruby", value: "Ruby" },
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (selectedOptions) => {
    const newItems = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setItems(newItems);
  };

  const handleCreate = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions((prev) => [...prev, newOption]);
    setItems((prev) => [...prev, inputValue]);
  };

  const handleAddNewSkill = () => {
    setIsAdding(true);
  };

  const handleSaveNewSkill = async () => {
    if (!newSkill.trim()) return;
    const newOption = { label: newSkill, value: newSkill };
    setOptions((prev) => [...prev, newOption]);
    setItems((prev) => [...prev, newSkill]);
    try {
      const response = await fetch("https://your-backend-api.com/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill: newSkill }),
      });
      if (response.ok) {
        console.log("Skill added successfully!");
      } else {
        console.log("Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
    setNewSkill("");
    setIsAdding(false);
  };

  return (
    <div className="mb-6 p-4 border rounded-md">
      <h5 className="text-xl font-semibold mb-3">{title}</h5>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        placeholder={placeholder}
        value={items.map((item) => ({ label: item, value: item }))}
      />
      <div className="mt-3 flex items-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleAddNewSkill}
        >
          Add New Skill
        </button>
        {isAdding && (
          <div className="ml-3 flex items-center">
            <input
              className="p-2 border rounded-md"
              placeholder="Enter new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={handleSaveNewSkill}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== EditableList Component =====
const EditableList = ({ title, label, placeholder }) => {
  const [items, setItems] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
      setShowInput(false);
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="mb-6 p-4 border rounded-md">
      <h5 className="text-xl font-semibold mb-3">{title}</h5>
      <ul className="list-none mb-3">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {item}
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleDelete(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {showInput ? (
        <div className="flex">
          <input
            className="p-2 border rounded-md me-2"
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => setShowInput(true)}
        >
          + Add {label}
        </button>
      )}
    </div>
  );
};

const Controller = ({ userId }) => {
  const linkClass = ({ isActive }) =>
    isActive ? "controller-btn bg-blue-500 text-white" : "controller-btn";

  return (
    <div className="flex gap-4 p-4 bg-white shadow-md rounded-md">
      <Link to="/business-profile" className={linkClass}>
        General Info
      </Link>
      <button className={linkClass}>Our Applicants</button>
      <button className={linkClass}>Feedback</button>
      <Link to={`/create_job/${userId}`} className={linkClass}>
        Post Jobs
      </Link>
      <Link to="/business-jobs" className={linkClass}>
        All Jobs
      </Link>
    </div>
  );
};

// ===== Main BProfilePage Component =====
const BProfilePage = () => {
  const [fullName, setFullName] = useState("mariam Mohamed");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [age, setAge] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [jobSearchStatus, setJobSearchStatus] = useState("");
  const [jobTitles, setJobTitles] = useState("");
  const [jobCategories, setJobCategories] = useState("");
  const [jobTypes, setJobTypes] = useState("");

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return name[0]?.toUpperCase() || "";
  };

  const initials = getInitials(fullName);

  const handleSave = () => {
    const profileData = {
      fullName,
      title,
      location,
      phone,
      cvLink,
      age,
      careerLevel,
      minSalary,
      jobSearchStatus,
      jobTitles,
      jobCategories,
      jobTypes,
    };
    console.log("Saved Profile Data:", profileData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="container mx-auto p-5">
      {/* Controller Buttons */}
      <Controller userId={userId} />

      {/* Profile Card */}
      <div className="w-full max-w-3xl mx-auto p-4 shadow-md mb-5 border rounded-md mt-16">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 text-white flex items-center justify-center rounded-full w-24 h-24 text-2xl">
            {initials}
          </div>
          <div className="ml-3">
            <h4 className="text-2xl font-semibold mb-2">{fullName}</h4>
            <EditableField
              label="Add your title"
              placeholder="Enter your title"
              value={title}
              onChange={setTitle}
            />
            <EditableField
              label="Add your location"
              placeholder="Enter your location"
              value={location}
              onChange={setLocation}
            />
          </div>
        </div>
        <div className="border-t pt-4">
          <h5 className="font-semibold mb-3">Contact Info:</h5>
          <div className="mb-2 flex items-center">
            <span className="mr-2">📞</span>
            <EditableField
              label="Add your phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-2">📧</span>
            <p className="text-muted mb-0">mariam74565@gmail.com</p>
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-2">📄</span>
            <EditableField
              label="Add your CV link"
              placeholder="Enter a link to your CV"
              value={cvLink}
              onChange={setCvLink}
            />
          </div>
          {cvLink && (
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View CV
            </a>
          )}
          <h5 className="mt-4 font-semibold">General Info:</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Age:</strong>{" "}
              <EditableField
                label="Add your age"
                placeholder="Enter your age"
                value={age}
                onChange={setAge}
              />
            </div>
            <div>
              <strong>Career Level:</strong>{" "}
              <EditableField
                label="Add your career level"
                placeholder="Enter career level"
                value={careerLevel}
                onChange={setCareerLevel}
              />
            </div>
            <div>
              <strong>Minimum Salary:</strong>{" "}
              <EditableField
                label="Add your min salary"
                placeholder="Enter min salary"
                value={minSalary}
                onChange={setMinSalary}
              />
            </div>
            <div>
              <strong>Job Search Status:</strong>{" "}
              <EditableField
                label="Add job search status"
                placeholder="Enter status"
                value={jobSearchStatus}
                onChange={setJobSearchStatus}
              />
            </div>
          </div>
          <h5 className="mt-4 font-semibold">Career Interests:</h5>
          <EditableField
            label="Job Titles and Keywords"
            placeholder="Enter job titles or keywords"
            value={jobTitles}
            onChange={setJobTitles}
          />
          <EditableField
            label="Job Categories"
            placeholder="Enter job categories"
            value={jobCategories}
            onChange={setJobCategories}
          />
          <EditableField
            label="Job Types"
            placeholder="Enter job types"
            value={jobTypes}
            onChange={setJobTypes}
          />
        </div>
      </div>

      {/* Skills, Experience, Education Sections */}
      <div className="w-full max-w-3xl mx-auto">
        <EditableTags title="Skills" label="Skill" placeholder="Add a skill" />
        <EditableList
          title="Experience"
          label="Experience"
          placeholder="Add experience"
        />
        <EditableList
          title="Education"
          label="Education"
          placeholder="Add education"
        />
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default BProfilePage;
