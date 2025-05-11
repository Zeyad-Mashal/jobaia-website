import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import "./ProfilePage.css";

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
          className="form-input w-full border rounded px-3 py-2"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => setEditing(true)}
        >
          {value ? value : `+ ${label}`}
        </span>
      )}
    </div>
  );
};

const EditableTags = ({
  title,
  label,
  placeholder,
  selectedOptions,
  setSelectedOptions,
}) => {
  const initialOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "SQL", label: "SQL" },
    { value: "AWS", label: "AWS" },
    { value: "Data Analysis", label: "Data Analysis" },
  ];

  const [options, setOptions] = useState(initialOptions);
  const handleChange = (selected) => {
    if (selected) {
      const newlySelected = selected[selected.length - 1];
      if (newlySelected) {
        setSelectedOptions((prev) => {
          // التأكد أن prev هي مصفوفة
          const prevOptions = Array.isArray(prev) ? prev : [];
          return [...prevOptions, newlySelected];
        });
        setOptions((prev) =>
          prev.filter((opt) => opt.value !== newlySelected.value)
        );
      }
    }
  };

  const handleDelete = (valueToRemove) => {
    const removedOption = selectedOptions.find(
      (opt) => opt.value === valueToRemove
    );
    if (removedOption) {
      setOptions((prev) => [...prev, removedOption]);
    }
    setSelectedOptions((prev) =>
      prev.filter((item) => item.value !== valueToRemove)
    );
  };
  const availableOptions = options.filter(
    (opt) =>
      !(
        selectedOptions &&
        selectedOptions.some((sel) => sel.value === opt.value)
      )
  );

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h5 className="text-lg font-semibold mb-4">{title}</h5>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedOptions?.map((item) => (
          <div
            key={item.value}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
          >
            <span className="mr-2">{item.label}</span>
            <button
              type="button"
              onClick={() => handleDelete(item.value)}
              className="text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <CreatableSelect
        options={availableOptions}
        isMulti
        value={[]}
        onChange={handleChange}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
        isClearable
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      />
    </div>
  );
};

const EditableList = ({ title, label, placeholder, items, setItems }) => {
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [showAll, setShowAll] = useState(false);

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
  const displayedItems =
    items && Array.isArray(items) ? (showAll ? items : items.slice(0, 3)) : [];

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h5 className="text-lg font-semibold mb-4">{title}</h5>
      <ul className="space-y-2 mb-4">
        {displayedItems.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 rounded"
          >
            {item}
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {items?.length > 3 && (
        <div className="text-center mb-4">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {showInput ? (
        <div className="flex gap-2">
          <input
            className="form-input flex-1 border rounded px-3 py-2"
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white rounded px-4"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      ) : (
        <button
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
          onClick={() => setShowInput(true)}
        >
          + Add {label}
        </button>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const data = JSON.parse(localStorage.getItem("profileData"));
  const userName = localStorage.getItem("userName");
  const [title, setTitle] = useState(data?.title);
  const [location, setLocation] = useState(data?.location);
  const [phone, setPhone] = useState(data?.phone);
  const [email, setemail] = useState(data?.email);
  const [cvLink, setCvLink] = useState(data?.cvLink);
  const [age, setAge] = useState(data?.age);
  const [careerLevel, setCareerLevel] = useState(data?.careerLevel);
  const [minSalary, setMinSalary] = useState(data?.minSalary);
  const [jobSearchStatus, setJobSearchStatus] = useState(data?.jobSearchStatus);
  const [jobTitles, setJobTitles] = useState(data?.jobTitles);
  const [jobCategories, setJobCategories] = useState(data?.jobCategories);
  const [jobTypes, setJobTypes] = useState(data?.jobTypes);
  const [skills, setSkills] = useState(data?.skills);
  const [experience, setExperience] = useState(data?.experience);
  const [education, setEducation] = useState(data?.education);
  const [saveMessage, setSaveMessage] = useState("");

  const getInitials = (name) => {
    // تأكد من أن الاسم ليس فارغًا أو null
    if (!name) return ""; // إذا كان الاسم null أو فارغ، ارجع سلسلة فارغة

    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return name[0]?.toUpperCase() || "";
  };

  const initials = getInitials(userName);

  const handleSave = () => {
    const profileData = {
      userName,
      title,
      location,
      phone,
      email,
      cvLink,
      age,
      careerLevel,
      minSalary,
      jobSearchStatus,
      jobTitles,
      jobCategories,
      jobTypes,
      skills,
      experience,
      education,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setSaveMessage("Your profile has been saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-600 text-white flex items-center justify-center rounded-full w-24 h-24 text-2xl">
            {initials}
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">
              {userName ? userName : "Your Name"}
            </h4>
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

        {/* Contact Info */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-3">Contact Info:</h5>
          <div className="flex items-center mb-2">
            <span className="mr-2">📞 </span>
            <EditableField
              label="Add your phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">📧</span>
            <p className="text-gray-500">{email}</p>
          </div>
          <div className="flex items-center mb-2">
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
              className="text-blue-600 hover:underline"
            >
              View CV
            </a>
          )}
        </div>

        {/* General Info */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-3">General Info:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Age:</strong>{" "}
              {data?.age ? (
                <EditableField
                  label="Update your age"
                  placeholder="Enter your age"
                  value={age}
                  onChange={setAge}
                />
              ) : (
                <EditableField
                  label="Add your age"
                  placeholder="Enter your age"
                  value={age}
                  onChange={setAge}
                />
              )}
            </div>
            <div>
              <strong>Career Level:</strong>{" "}
              {data?.careerLevel ? (
                <EditableField
                  label="Update your career level"
                  placeholder="Enter career level"
                  value={careerLevel}
                  onChange={setCareerLevel}
                />
              ) : (
                <EditableField
                  label="Add your careerLevel"
                  placeholder="Enter careerLevel"
                  value={careerLevel}
                  onChange={setCareerLevel}
                />
              )}
            </div>
            <div>
              <strong>Minimum Salary:</strong>{" "}
              {data?.minSalary ? (
                <EditableField
                  label="Update your min salary"
                  placeholder="Enter min salary"
                  value={minSalary}
                  onChange={setMinSalary}
                />
              ) : (
                <EditableField
                  label="Add your min salary"
                  placeholder="Enter min salary"
                  value={minSalary}
                  onChange={setMinSalary}
                />
              )}
            </div>
            <div>
              <strong>Job Search Status:</strong>{" "}
              {data?.jobSearchStatus ? (
                <EditableField
                  label="Update job search status"
                  placeholder="Enter status"
                  value={jobSearchStatus}
                  onChange={setJobSearchStatus}
                />
              ) : (
                <EditableField
                  label="Add job search status"
                  placeholder="job search status"
                  value={jobSearchStatus}
                  onChange={setJobSearchStatus}
                />
              )}
            </div>
          </div>
        </div>

        {/* Career Interests */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Career Interests:</h5>
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
      <EditableTags
        title="Skills"
        label="Skill"
        placeholder="Select a skill..."
        selectedOptions={skills}
        setSelectedOptions={setSkills}
      />
      <EditableList
        title="Work Experience"
        label="Work Experience"
        placeholder="Enter experience"
        items={experience}
        setItems={setExperience}
      />
      <EditableList
        title="Education"
        label="Education"
        placeholder="Enter education"
        items={education}
        setItems={setEducation}
      />

      <div className="text-right">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded"
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>

      {saveMessage && <div className="mt-4 text-green-600">{saveMessage}</div>}
    </div>
  );
};

export default ProfilePage;
